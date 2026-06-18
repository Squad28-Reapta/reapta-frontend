import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import { api } from '../services/api';

const STATUS_LABEL = { pendente: 'Pendente', concluida: 'Finalizada', cancelada: 'Cancelada' };
const STATUS_COLOR = { pendente: '#e65100', concluida: '#2e7d32', cancelada: '#c62828' };
const STATUS_BG    = { pendente: '#fff3e0', concluida: '#e8f5e9', cancelada: '#fce4ec' };

function moeda(v) {
  if (v == null) return '—';
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v);
}

function data(d) {
  if (!d) return '—';
  return new Date(d).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' });
}

function InfoRow({ label, value }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f5f5f5' }}>
      <span style={{ fontSize: 13, color: '#888' }}>{label}</span>
      <span style={{ fontSize: 13, color: '#1a1a1a', fontWeight: 600 }}>{value}</span>
    </div>
  );
}

export default function ModalDetalheVenda({ vendaId, onClose }) {
  const [venda, setVenda] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    let cancelado = false;
    const carregar = async () => {
      try {
        const res = await api(`/api/v1/vendas/${vendaId}`, 'GET');
        if (!cancelado) setVenda(res.data);
      } catch {
        if (!cancelado) setErro('Não foi possível carregar os detalhes da venda.');
      } finally {
        if (!cancelado) setCarregando(false);
      }
    };
    carregar();
    return () => { cancelado = true; };
  }, [vendaId]);

  const atualizarStatus = async (novoStatus) => {
    try {
      await api(`/api/v1/vendas/${vendaId}`, 'PUT', { status: novoStatus });
      const res = await api(`/api/v1/vendas/${vendaId}`, 'GET');
      setVenda(res.data);
    } catch {
      setErro('Não foi possível atualizar o status.');
    }
  };

  return (
    <Modal titulo={`Venda #${String(vendaId).padStart(6, '0')}`} onClose={onClose} largura="640px">
      {carregando && (
        <p style={{ color: '#888', textAlign: 'center', padding: '32px 0' }}>Carregando...</p>
      )}

      {erro && <div className="modal-erro">{erro}</div>}

      {venda && (
        <>
          <div style={{ marginBottom: 20 }}>
            <span style={{
              display: 'inline-block',
              padding: '4px 14px',
              borderRadius: 20,
              fontSize: 13,
              fontWeight: 700,
              background: STATUS_BG[venda.status] ?? '#f5f5f5',
              color: STATUS_COLOR[venda.status] ?? '#555',
            }}>
              {STATUS_LABEL[venda.status] ?? venda.status}
            </span>
          </div>

          <p className="modal-secao-titulo">Dados da Venda</p>
          <InfoRow label="Data" value={data(venda.data_venda)} />
          <InfoRow label="Vendedor" value={venda.vendedor_nome ?? '—'} />
          <InfoRow label="Estado (UF)" value={venda.estado ?? '—'} />
          <InfoRow label="Cidade" value={venda.cidade ?? '—'} />
          <InfoRow label="Desconto geral" value={moeda(venda.desconto_total)} />
          <InfoRow label="Valor total" value={moeda(venda.valor_total)} />

          {/* ─── Cliente ─── */}
          {venda.cliente_nome && (
            <>
              <hr className="modal-divider" />
              <p className="modal-secao-titulo" style={{ marginTop: 8 }}>Cliente</p>
              <div style={{
                background: '#f9f9f9',
                border: '1px solid #ececec',
                borderRadius: 10,
                padding: '14px 16px',
                marginBottom: 4,
              }}>
                <p style={{ margin: 0, fontWeight: 700, fontSize: 14, color: '#1a1a1a' }}>
                  {venda.cliente_nome}
                </p>
                {venda.cliente_cpf_cnpj && (
                  <p style={{ margin: '4px 0 0', fontSize: 13, color: '#555' }}>
                    CPF/CNPJ: {venda.cliente_cpf_cnpj}
                  </p>
                )}
                {venda.cliente_email && (
                  <p style={{ margin: '2px 0 0', fontSize: 13, color: '#555' }}>
                    E-mail: {venda.cliente_email}
                  </p>
                )}
                {venda.cliente_telefone && (
                  <p style={{ margin: '2px 0 0', fontSize: 13, color: '#555' }}>
                    Telefone: {venda.cliente_telefone}
                  </p>
                )}
              </div>
            </>
          )}

          <hr className="modal-divider" />

          <p className="modal-secao-titulo" style={{ marginTop: 8 }}>
            Itens ({venda.itens?.length ?? 0})
          </p>

          {(!venda.itens || venda.itens.length === 0) && (
            <p style={{ color: '#aaa', fontSize: 13 }}>Nenhum item registrado.</p>
          )}

          {venda.itens?.map((item, i) => (
            <div key={item.id ?? i} style={{
              background: '#fafafa',
              border: '1px solid #ececec',
              borderRadius: 10,
              padding: '14px 16px',
              marginBottom: 10,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 8 }}>
                <div>
                  <p style={{ margin: 0, fontWeight: 700, fontSize: 14, color: '#1a1a1a' }}>
                    {item.produto_nome}
                  </p>
                  <p style={{ margin: '2px 0 0', fontSize: 12, color: '#888' }}>
                    SKU: {item.produto_sku} &nbsp;·&nbsp; {item.produto_categoria ?? '—'}
                  </p>
                </div>
                <span style={{ fontWeight: 700, color: '#FF7F2A', fontSize: 15 }}>
                  {moeda((item.preco_unitario * item.quantidade) - (item.desconto ?? 0))}
                </span>
              </div>
              <div style={{ display: 'flex', gap: 24, marginTop: 10, fontSize: 13, color: '#555' }}>
                <span>Qtd: <strong>{item.quantidade}</strong></span>
                <span>Preço unit.: <strong>{moeda(item.preco_unitario)}</strong></span>
                {item.desconto > 0 && (
                  <span>Desconto: <strong>{moeda(item.desconto)}</strong></span>
                )}
              </div>
            </div>
          ))}

          <div style={{ marginTop: 16, display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
            {venda.status === 'pendente' && (
              <>
                <button className="modal-btn-cancelar" onClick={() => atualizarStatus('cancelada')}>
                  Cancelar Venda
                </button>
                <button className="modal-btn-salvar" onClick={() => atualizarStatus('concluida')}>
                  Finalizar Venda
                </button>
              </>
            )}
            <button className="modal-btn-cancelar" onClick={onClose}>Fechar</button>
          </div>
        </>
      )}
    </Modal>
  );
}
