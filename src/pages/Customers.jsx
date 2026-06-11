import React, { useState } from 'react';
import '../styles/Customers.css';

export default function Customers() {
  // Dados simulados (mock) para a lista de clientes
  const [customers] = useState([
    { id: '1001', name: 'Ana Rita Soares', email: 'ana.soares@email.com', phone: '912 345 678', status: 'Ativo' },
    { id: '1002', name: 'Carlos Pereira', email: 'carlos.p@email.com', phone: '965 432 198', status: 'Ativo' },
    { id: '1003', name: 'Beatriz Gomes', email: 'bia.gomes@email.com', phone: '933 221 144', status: 'Ativo' },
    { id: '1004', name: 'Diogo Mendes', email: 'diogo.m@email.com', phone: '911 888 777', status: 'Ativo' },
  ]);

  return (
    <div className="customers-container">
      {/* Cabeçalho da página com título e ações */}
      <div className="customers-header">
        <h2>Gestão de Clientes</h2>
        <div className="customers-actions">
          <input type="text" placeholder="Pesquisar cliente..." className="search-input" />
          <button className="btn-add-customer">+ Adicionar Cliente</button>
        </div>
      </div>

      {/* Tabela de listagem */}
      <div className="customers-table-container">
        <table className="customers-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>E-mail</th>
              <th>Telefone</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id}>
                <td>{customer.id}</td>
                <td>{customer.name}</td>
                <td>{customer.email}</td>
                <td>{customer.phone}</td>
                <td><span className="status-badge">{customer.status}</span></td>
                <td>
                  <button className="btn-edit">Editar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}