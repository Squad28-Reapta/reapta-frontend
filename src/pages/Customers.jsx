import React, { useState, useEffect, useCallback } from 'react';
import '../styles/Customers.css';
import ModalNovoCliente from '../components/ModalNovoCliente';
import { getClientes, deletarCliente } from '../services/customers.js';

export default function Customers() {
  const [clientes, setClientes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');
  const [busca, setBusca] = useState('');

  const [modalAberto, setModalAberto] = useState(false);
  const [clienteEditando, setClienteEditando] = useState(null);

  const carregarClientes = useCallback(async () => {
    setCarregando(true);
    setErro('');
    try {
      const dados = await getClientes(busca);
      setClientes(dados);
    } catch (e) {
      setErro(e.message || 'Erro ao carregar clientes.');
    } finally {
      setCarregando(false);
    }
  }, [busca]);

  // Busca clientes ao montar e sempre que a busca mudar (com debounce)
  useEffect(() => {
    const timer = setTimeout(() => {
      carregarClientes();
    }, 350);
    return () => clearTimeout(timer);
  }, [carregarClientes]);

  async function handleDeletar(id) {
    if (!confirm('Tem certeza que deseja remover este cliente?')) return;
    try {
      await deletarCliente(id);
      setClientes((prev) => prev.filter((c) => c.id !== id));
    } catch (e) {
      alert(e.message || 'Erro ao remover cliente.');
    }
  }

  function handleSucesso() {
    carregarClientes();
  }

  return (
    <div className="customers-container">
      <div className="customers-header">
        <h2>Gestão de Clientes</h2>
        <div className="customers-actions">
          <input
            type="text"
            placeholder="Pesquisar por nome ou CPF/CNPJ..."
            className="search-input"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
          <button className="btn-add-customer" onClick={() => setModalAberto(true)}>
            + Adicionar Cliente
          </button>
        </div>
      </div>

      <div className="customers-table-container">
        {carregando ? (
          <p className="customers-estado">Carregando...</p>
        ) : erro ? (
          <p className="customers-estado customers-erro">{erro}</p>
        ) : clientes.length === 0 ? (
          <p className="customers-estado">Nenhum cliente encontrado.</p>
        ) : (
          <table className="customers-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>CPF / CNPJ</th>
                <th>E-mail</th>
                <th>Telefone</th>
                <th>Endereço</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {clientes.map((cliente) => (
                <tr key={cliente.id}>
                  <td>{cliente.nome}</td>
                  <td>{cliente.cpf_cnpj}</td>
                  <td>{cliente.email}</td>
                  <td>{cliente.telefone}</td>
                  <td>{cliente.endereco}</td>
                  <td className="td-acoes">
                    <button
                      className="btn-edit"
                      onClick={() => setClienteEditando(cliente)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => handleDeletar(cliente.id)}
                    >
                      Remover
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {modalAberto && (
        <ModalNovoCliente
          onClose={() => setModalAberto(false)}
          onSucesso={handleSucesso}
        />
      )}

      {clienteEditando && (
        <ModalNovoCliente
          cliente={clienteEditando}
          onClose={() => setClienteEditando(null)}
          onSucesso={handleSucesso}
        />
      )}
    </div>
  );
}
