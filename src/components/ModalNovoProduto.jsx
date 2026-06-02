import React, { useState } from 'react';
import Modal from './Modal';
import { postProducts, updateProduct } from '../services/product';

const FORM_VAZIO = {
  sku: '',
  nome: '',
  descricao: '',
  categoria: '',
  fabricante: '',
  cor: '',
  tamanho: '',
  preco_atual: '',
  estoque_atual: 0,
  estoque_minimo: 5,
};

function produtoParaForm(p) {
  return {
    sku:           p.sku           ?? '',
    nome:          p.nome          ?? '',
    descricao:     p.descricao     ?? '',
    categoria:     p.categoria     ?? '',
    fabricante:    p.fabricante    ?? '',
    cor:           p.cor           ?? '',
    tamanho:       p.tamanho       ?? '',
    preco_atual:   p.preco_atual   ?? '',
    estoque_atual: p.estoque_atual ?? 0,
    estoque_minimo:p.estoque_minimo?? 5,
  };
}

export default function ModalNovoProduto({ onClose, onSucesso, produto }) {
  const editando = Boolean(produto);
  const [form, setForm] = useState(editando ? produtoParaForm(produto) : { ...FORM_VAZIO });
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');

    if (!form.sku || !form.nome || !form.preco_atual) {
      setErro('SKU, Nome e Preço são obrigatórios.');
      return;
    }

    if (parseFloat(form.preco_atual) <= 0) {
      setErro('O preço deve ser maior que zero.');
      return;
    }

    const payload = {
      sku:           form.sku.trim(),
      nome:          form.nome.trim(),
      descricao:     form.descricao.trim()  || null,
      categoria:     form.categoria.trim()  || null,
      fabricante:    form.fabricante.trim() || null,
      cor:           form.cor.trim()        || null,
      tamanho:       form.tamanho.trim()    || null,
      preco_atual:   parseFloat(form.preco_atual),
      estoque_atual: parseInt(form.estoque_atual)  || 0,
      estoque_minimo:parseInt(form.estoque_minimo) || 5,
    };

    setCarregando(true);
    try {
      if (editando) {
        await updateProduct(produto.id, payload);
      } else {
        await postProducts(payload);
      }
      onSucesso?.();
      onClose();
    } catch (err) {
      setErro(err.message || (editando ? 'Não foi possível atualizar o produto.' : 'Não foi possível cadastrar o produto.'));
    } finally {
      setCarregando(false);
    }
  };

  const titulo = editando ? `Editar Produto — ${produto.sku}` : 'Novo Produto';
  const textoBotao = carregando
    ? (editando ? 'Salvando...' : 'Cadastrando...')
    : (editando ? 'Salvar Alterações' : 'Cadastrar Produto');

  return (
    <Modal titulo={titulo} onClose={onClose} largura="640px">
      <form onSubmit={handleSubmit}>
        {erro && <div className="modal-erro">{erro}</div>}

        {/* ─── Identificação ─── */}
        <p className="modal-secao-titulo">Identificação</p>
        <div className="modal-grid-2">
          <div className="modal-field">
            <label className="modal-label">SKU *</label>
            <input
              className="modal-input"
              name="sku"
              value={form.sku}
              onChange={handleChange}
              placeholder="Ex: PROD-001"
              required
            />
          </div>
          <div className="modal-field">
            <label className="modal-label">Categoria</label>
            <input
              className="modal-input"
              name="categoria"
              value={form.categoria}
              onChange={handleChange}
              placeholder="Ex: Eletrônicos"
            />
          </div>
        </div>

        <div className="modal-field">
          <label className="modal-label">Nome do Produto *</label>
          <input
            className="modal-input"
            name="nome"
            value={form.nome}
            onChange={handleChange}
            placeholder="Nome completo do produto"
            required
          />
        </div>

        <div className="modal-field">
          <label className="modal-label">Descrição</label>
          <textarea
            className="modal-textarea"
            name="descricao"
            value={form.descricao}
            onChange={handleChange}
            placeholder="Descrição opcional do produto"
          />
        </div>

        <hr className="modal-divider" />

        {/* ─── Detalhes físicos ─── */}
        <p className="modal-secao-titulo">Detalhes</p>
        <div className="modal-grid-3">
          <div className="modal-field">
            <label className="modal-label">Fabricante</label>
            <input
              className="modal-input"
              name="fabricante"
              value={form.fabricante}
              onChange={handleChange}
              placeholder="Fabricante"
            />
          </div>
          <div className="modal-field">
            <label className="modal-label">Cor</label>
            <input
              className="modal-input"
              name="cor"
              value={form.cor}
              onChange={handleChange}
              placeholder="Ex: Preto"
            />
          </div>
          <div className="modal-field">
            <label className="modal-label">Tamanho</label>
            <input
              className="modal-input"
              name="tamanho"
              value={form.tamanho}
              onChange={handleChange}
              placeholder="Ex: P / M / G"
            />
          </div>
        </div>

        <hr className="modal-divider" />

        {/* ─── Preço e estoque ─── */}
        <p className="modal-secao-titulo">Preço e Estoque</p>
        <div className="modal-grid-3">
          <div className="modal-field">
            <label className="modal-label">Preço Atual (R$) *</label>
            <input
              className="modal-input"
              type="number"
              name="preco_atual"
              value={form.preco_atual}
              onChange={handleChange}
              min="0.01"
              step="0.01"
              placeholder="0,00"
              required
            />
          </div>
          <div className="modal-field">
            <label className="modal-label">Estoque Atual</label>
            <input
              className="modal-input"
              type="number"
              name="estoque_atual"
              value={form.estoque_atual}
              onChange={handleChange}
              min="0"
            />
          </div>
          <div className="modal-field">
            <label className="modal-label">Estoque Mínimo</label>
            <input
              className="modal-input"
              type="number"
              name="estoque_minimo"
              value={form.estoque_minimo}
              onChange={handleChange}
              min="0"
            />
          </div>
        </div>

        <div className="modal-actions">
          <button type="button" className="modal-btn-cancelar" onClick={onClose}>
            Cancelar
          </button>
          <button type="submit" className="modal-btn-salvar" disabled={carregando}>
            {textoBotao}
          </button>
        </div>
      </form>
    </Modal>
  );
}
