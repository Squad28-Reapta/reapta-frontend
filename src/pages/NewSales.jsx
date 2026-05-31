import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import '../styles/NewSales.css';

const ESTADOS_BR = [
  'AC','AL','AP','AM','BA','CE','DF','ES','GO','MA',
  'MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN',
  'RS','RO','RR','SC','SP','SE','TO',
];

export default function NewSales() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    produto_id: '',
    quantidade: 1,
    preco_unitario: '',
    estado: '',
  });

  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');

  useEffect(() => {
    api('/api/v1/produtos', 'GET')
      .then((res) => setProdutos(res.data ?? []))
      .catch(() => setProdutos([]));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'produto_id') {
      const produto = produtos.find((p) => p.id === parseInt(value));
      setForm((prev) => ({
        ...prev,
        produto_id: value,
        preco_unitario: produto ? produto.preco_atual : ''
      }));
      return;
    }

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    setCarregando(true);

    try {
      await api('/api/v1/vendas', 'POST', {
        estado: form.estado,
        itens: [
          {
            produto_id: parseInt(form.produto_id),
            quantidade: parseInt(form.quantidade),
            preco_unitario: parseFloat(form.preco_unitario),
          },
        ],
      });

      navigate('/sales');
    } catch (err) {
      setErro('Não foi possível registrar a venda. Tente novamente.');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="new-sales-container">
      <div>
        <h2 className="new-sales-title">Lançar Nova Venda</h2>
        <p className="new-sales-subtitle">Insira os dados da transação efetuada</p>
      </div>

      <div className="new-sales-card">
        <form onSubmit={handleSubmit}>

          {/* Linha 1 — Produto e Quantidade */}
          <div className="new-sales-grid col-2-1">
            <div>
              <label className="new-sales-label">Produto</label>
              <select
                name="produto_id"
                value={form.produto_id}
                onChange={handleChange}
                className="new-sales-select"
                required
              >
                <option value="">Selecione o produto no catálogo...</option>
                {produtos.map((p) => (
                  <option key={p.id} value={p.id}>{p.nome}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="new-sales-label">Quantidade</label>
              <input
                type="number"
                name="quantidade"
                min="1"
                value={form.quantidade}
                onChange={handleChange}
                className="new-sales-input"
                required
              />
            </div>
          </div>

          {/* Linha 2 — Preço unitário e Estado */}
          <div className="new-sales-grid col-1-1">
            <div>
              <label className="new-sales-label">Preço Unitário (R$)</label>
              <input
                type="number"
                name="preco_unitario"
                min="0.01"
                step="0.01"
                placeholder="0,00"
                value={form.preco_unitario}
                onChange={handleChange}
                className="new-sales-input"
                required
              />
            </div>
            <div>
              <label className="new-sales-label">Estado (UF)</label>
              <select
                name="estado"
                value={form.estado}
                onChange={handleChange}
                className="new-sales-select"
                required
              >
                <option value="">UF</option>
                {ESTADOS_BR.map((uf) => (
                  <option key={uf} value={uf}>{uf}</option>
                ))}
              </select>
            </div>
          </div>

          {erro && <p className="new-sales-erro">{erro}</p>}

          <hr className="new-sales-divider" />

          {/* Botões */}
          <div className="new-sales-actions">
            <button
              type="button"
              className="btn-cancelar"
              onClick={() => navigate('/sales')}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn-salvar"
              disabled={carregando}
            >
              {carregando ? 'Salvando...' : 'Salvar Registro'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
