import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import { api } from '../services/api';

const ESTADOS_BR = [
  'AC','AL','AP','AM','BA','CE','DF','ES','GO','MA',
  'MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN',
  'RS','RO','RR','SC','SP','SE','TO',
];

function moeda(v) {
  if (!v && v !== 0) return '';
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v);
}

const ITEM_VAZIO = { produto_id: '', quantidade: 1, preco_unitario: '', desconto: 0 };

export default function ModalNovaVenda({ onClose, onSucesso }) {
  const [produtos, setProdutos] = useState([]);
  const [itens, setItens] = useState([]);
  const [itemAtual, setItemAtual] = useState({ ...ITEM_VAZIO });
  const [estado, setEstado] = useState('');
  const [cidade, setCidade] = useState('');
  const [descontoTotal, setDescontoTotal] = useState(0);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');

  useEffect(() => {
    api('/api/v1/produtos', 'GET')
      .then((res) => setProdutos(res.data ?? []))
      .catch(() => setProdutos([]));
  }, []);

  const handleItemChange = (e) => {
    const { name, value } = e.target;

    if (name === 'produto_id') {
      const p = produtos.find((x) => x.id === parseInt(value));
      setItemAtual((prev) => ({
        ...prev,
        produto_id: value,
        preco_unitario: p ? p.preco_atual : '',
      }));
      return;
    }

    setItemAtual((prev) => ({ ...prev, [name]: value }));
  };

  const adicionarItem = () => {
    if (!itemAtual.produto_id || !itemAtual.quantidade || !itemAtual.preco_unitario) {
      setErro('Preencha produto, quantidade e preço antes de adicionar o item.');
      return;
    }

    const produto = produtos.find((p) => p.id === parseInt(itemAtual.produto_id));
    setItens((prev) => [
      ...prev,
      {
        produto_id: parseInt(itemAtual.produto_id),
        produto_nome: produto?.nome ?? '',
        produto_sku: produto?.sku ?? '',
        quantidade: parseInt(itemAtual.quantidade),
        preco_unitario: parseFloat(itemAtual.preco_unitario),
        desconto: parseFloat(itemAtual.desconto || 0),
      },
    ]);
    setItemAtual({ ...ITEM_VAZIO });
    setErro('');
  };

  const removerItem = (idx) => {
    setItens((prev) => prev.filter((_, i) => i !== idx));
  };

  const totalVenda = itens.reduce(
    (acc, item) => acc + item.preco_unitario * item.quantidade - (item.desconto ?? 0),
    0
  ) - parseFloat(descontoTotal || 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');

    if (itens.length === 0) {
      setErro('Adicione pelo menos um item antes de registrar a venda.');
      return;
    }

    setCarregando(true);
    try {
      await api('/api/v1/vendas', 'POST', {
        estado: estado || null,
        cidade: cidade || null,
        desconto_total: parseFloat(descontoTotal || 0),
        itens: itens.map(({ produto_id, quantidade, preco_unitario, desconto }) => ({
          produto_id,
          quantidade,
          preco_unitario,
          desconto,
        })),
      });
      onSucesso?.();
      onClose();
    } catch (err) {
      setErro(err.message || 'Não foi possível registrar a venda.');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <Modal titulo="Nova Venda" onClose={onClose} largura="680px">
      <form onSubmit={handleSubmit}>
        {erro && <div className="modal-erro">{erro}</div>}

        {/* ─── Adicionar item ─── */}
        <p className="modal-secao-titulo">Adicionar Item</p>

        <div className="modal-field">
          <label className="modal-label">Produto</label>
          <select
            className="modal-select"
            name="produto_id"
            value={itemAtual.produto_id}
            onChange={handleItemChange}
          >
            <option value="">Selecione um produto...</option>
            {produtos.map((p) => (
              <option key={p.id} value={p.id}>
                {p.nome} — {p.sku} (Estoque: {p.estoque_atual})
              </option>
            ))}
          </select>
        </div>

        <div className="modal-grid-3">
          <div className="modal-field">
            <label className="modal-label">Quantidade</label>
            <input
              className="modal-input"
              type="number"
              name="quantidade"
              min="1"
              value={itemAtual.quantidade}
              onChange={handleItemChange}
            />
          </div>
          <div className="modal-field">
            <label className="modal-label">Preço Unitário (R$)</label>
            <input
              className="modal-input"
              type="number"
              name="preco_unitario"
              min="0.01"
              step="0.01"
              placeholder="0,00"
              value={itemAtual.preco_unitario}
              onChange={handleItemChange}
            />
          </div>
          <div className="modal-field">
            <label className="modal-label">Desconto do item (R$)</label>
            <input
              className="modal-input"
              type="number"
              name="desconto"
              min="0"
              step="0.01"
              placeholder="0,00"
              value={itemAtual.desconto}
              onChange={handleItemChange}
            />
          </div>
        </div>

        <button
          type="button"
          onClick={adicionarItem}
          style={{
            background: '#f5f5f5',
            border: '1px dashed #ccc',
            borderRadius: 8,
            padding: '8px 16px',
            fontSize: 13,
            fontWeight: 600,
            color: '#555',
            cursor: 'pointer',
            marginBottom: 16,
          }}
        >
          + Adicionar item à lista
        </button>

        {/* ─── Lista de itens ─── */}
        {itens.length > 0 && (
          <>
            <hr className="modal-divider" />
            <p className="modal-secao-titulo">Itens da Venda ({itens.length})</p>
            {itens.map((item, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: '#fafafa',
                  border: '1px solid #ececec',
                  borderRadius: 8,
                  padding: '10px 14px',
                  marginBottom: 8,
                  flexWrap: 'wrap',
                  gap: 8,
                }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ margin: 0, fontWeight: 600, fontSize: 13, color: '#1a1a1a', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {item.produto_nome}
                  </p>
                  <p style={{ margin: '2px 0 0', fontSize: 12, color: '#888' }}>
                    {item.quantidade}× {moeda(item.preco_unitario)}
                    {item.desconto > 0 && ` – desc. ${moeda(item.desconto)}`}
                    {' = '}
                    <strong>{moeda(item.preco_unitario * item.quantidade - item.desconto)}</strong>
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => removerItem(i)}
                  style={{ background: 'none', border: 'none', color: '#c0392b', cursor: 'pointer', fontSize: 18, lineHeight: 1 }}
                  aria-label="Remover item"
                >
                  ×
                </button>
              </div>
            ))}
          </>
        )}

        <hr className="modal-divider" />

        {/* ─── Dados gerais ─── */}
        <p className="modal-secao-titulo">Dados Gerais</p>
        <div className="modal-grid-2">
          <div className="modal-field">
            <label className="modal-label">Estado (UF)</label>
            <select
              className="modal-select"
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
            >
              <option value="">Selecione...</option>
              {ESTADOS_BR.map((uf) => (
                <option key={uf} value={uf}>{uf}</option>
              ))}
            </select>
          </div>
          <div className="modal-field">
            <label className="modal-label">Cidade</label>
            <input
              className="modal-input"
              type="text"
              placeholder="Cidade (opcional)"
              value={cidade}
              onChange={(e) => setCidade(e.target.value)}
            />
          </div>
        </div>

        <div className="modal-field" style={{ maxWidth: 200 }}>
          <label className="modal-label">Desconto geral (R$)</label>
          <input
            className="modal-input"
            type="number"
            min="0"
            step="0.01"
            placeholder="0,00"
            value={descontoTotal}
            onChange={(e) => setDescontoTotal(e.target.value)}
          />
        </div>

        {/* ─── Total ─── */}
        {itens.length > 0 && (
          <div style={{
            background: '#fff8f3',
            border: '1px solid #ffe0c8',
            borderRadius: 10,
            padding: '12px 16px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 16,
          }}>
            <span style={{ fontSize: 14, color: '#555' }}>Total da venda</span>
            <span style={{ fontSize: 20, fontWeight: 700, color: '#FF7F2A' }}>
              {moeda(totalVenda)}
            </span>
          </div>
        )}

        <div className="modal-actions">
          <button type="button" className="modal-btn-cancelar" onClick={onClose}>
            Cancelar
          </button>
          <button type="submit" className="modal-btn-salvar" disabled={carregando}>
            {carregando ? 'Registrando...' : 'Registrar Venda'}
          </button>
        </div>
      </form>
    </Modal>
  );
}
