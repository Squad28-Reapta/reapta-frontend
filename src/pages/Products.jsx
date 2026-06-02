import React, { useState, useEffect, useCallback } from 'react';
import '../styles/Products.css';
import { getProducts } from '../services/product';
import ModalNovoProduto from '../components/ModalNovoProduto';

function formatarPreco(v) {
  if (v == null) return '—';
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v);
}

export default function Products() {
  const [products, setProducts] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');
  const [busca, setBusca] = useState('');
  const [modalAberto, setModalAberto] = useState(false);
  const [produtoEditando, setProdutoEditando] = useState(null);

  const carregarProdutos = useCallback(async () => {
    setCarregando(true);
    setErro('');
    try {
      const dados = await getProducts();
      setProducts(dados ?? []);
    } catch {
      setErro('Não foi possível carregar os produtos.');
    } finally {
      setCarregando(false);
    }
  }, []);

  useEffect(() => { carregarProdutos(); }, [carregarProdutos]);

  const produtosFiltrados = products.filter((p) => {
    if (!busca) return true;
    const q = busca.toLowerCase();
    return (
      (p.nome ?? '').toLowerCase().includes(q) ||
      (p.sku ?? '').toLowerCase().includes(q) ||
      (p.categoria ?? '').toLowerCase().includes(q)
    );
  });

  return (
    <>
      <div className="produtos-container">
        <div className="produtos-header">
          <div>
            <h2 className="produtos-title">Produtos</h2>
            <p className="produtos-subtitle">Gerenciamento de estoque e catálogo</p>
          </div>
          <button
            className="produtos-btn-novo"
            onClick={() => setModalAberto(true)}
          >
            + Novo Produto
          </button>
        </div>

        <div className="produtos-toolbar">
          <div className="produtos-search-wrapper">
            <svg className="produtos-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              className="produtos-search"
              placeholder="Buscar por nome, SKU ou categoria..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </div>
        </div>

        {erro && (
          <div className="produtos-erro">
            <p>{erro}</p>
            <button onClick={carregarProdutos}>Tentar novamente</button>
          </div>
        )}

        {carregando ? (
          <div className="produtos-vazio"><p>Carregando...</p></div>
        ) : !erro && produtosFiltrados.length === 0 ? (
          <div className="produtos-vazio">
            <p>{busca ? 'Nenhum produto corresponde à busca.' : 'Nenhum produto cadastrado.'}</p>
          </div>
        ) : (
          <div className="produtos-table-wrapper">
            <table className="produtos-table">
              <thead>
                <tr>
                  <th>CÓDIGO</th>
                  <th>NOME DO PRODUTO</th>
                  <th>CATEGORIA</th>
                  <th>PREÇO UNITÁRIO</th>
                  <th>DISPONÍVEL</th>
                  <th>AÇÕES</th>
                </tr>
              </thead>
              <tbody>
                {produtosFiltrados.map((item) => (
                  <tr key={item.id}>
                    <td className="td-sku">{item.sku}</td>
                    <td className="td-nome">{item.nome}</td>
                    <td className="td-cat">{item.categoria ?? '—'}</td>
                    <td className="td-preco">{formatarPreco(item.preco_atual)}</td>
                    <td className={`td-estoque ${item.estoque_atual <= item.estoque_minimo ? 'estoque-baixo' : 'estoque-ok'}`}>
                      {item.estoque_atual ?? 0} un
                      {item.estoque_atual <= item.estoque_minimo && (
                        <span className="badge-estoque-baixo">Baixo</span>
                      )}
                    </td>
                    <td className="td-acoes">
                      <button
                        className="btn-editar-produto"
                        onClick={() => setProdutoEditando(item)}
                        title="Editar produto"
                      >
                        Editar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {modalAberto && (
        <ModalNovoProduto
          onClose={() => setModalAberto(false)}
          onSucesso={carregarProdutos}
        />
      )}

      {produtoEditando && (
        <ModalNovoProduto
          produto={produtoEditando}
          onClose={() => setProdutoEditando(null)}
          onSucesso={carregarProdutos}
        />
      )}
    </>
  );
}
