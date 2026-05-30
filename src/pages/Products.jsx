import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Products() {
  const navigate = useNavigate();

  const mockProducts = [
    { codigo: 'PROD-01', nome: 'Dispositivo IoT Reapta Node', categoria: 'Hardware', preco: 'R$ 890,00', estoque: 34 },
    { codigo: 'PROD-02', nome: 'Módulo de Sensor de Presença', categoria: 'Componentes', preco: 'R$ 145,00', estoque: 112 },
    { codigo: 'PROD-03', nome: 'Licença Anual Reapta Dash', categoria: 'Software', preco: 'R$ 1.590,00', estoque: 999 },
    { codigo: 'PROD-04', nome: 'Gateway de Comunicação LoRaWAN', categoria: 'Redes', preco: 'R$ 2.400,00', estoque: 8 },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ color: '#333', fontSize: '24px', fontWeight: 'bold', margin: 0 }}>Produtos</h2>
          <p style={{ margin: '4px 0 0 0', color: '#666', fontSize: '14px' }}>Gerenciamento de estoque e catálogo</p>
        </div>
        <button 
          onClick={() => navigate('/novas-vendas')}
          style={{ backgroundColor: '#FF7F2A', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer', transition: 'background 0.2s' }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#B35900'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#FF7F2A'}
        >
          + Novo Produto
        </button>
      </div>

      <div style={{ backgroundColor: 'white', borderRadius: '15px', boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)', overflow: 'hidden', border: '1px solid #e5e4e7' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '15px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f4f3ec', borderBottom: '1px solid #e5e4e7' }}>
              <th style={{ padding: '16px', color: '#08060d', fontWeight: '600' }}>CÓDIGO</th>
              <th style={{ padding: '16px', color: '#08060d', fontWeight: '600' }}>NOME DO PRODUTO</th>
              <th style={{ padding: '16px', color: '#08060d', fontWeight: '600' }}>CATEGORIA</th>
              <th style={{ padding: '16px', color: '#08060d', fontWeight: '600' }}>PREÇO UNITÁRIO</th>
              <th style={{ padding: '16px', color: '#08060d', fontWeight: '600' }}>DISPONÍVEL</th>
            </tr>
          </thead>
          <tbody>
            {mockProdutos.map((item) => (
              <tr key={item.codigo} style={{ borderBottom: '1px solid #e5e4e7' }}>
                <td style={{ padding: '16px', color: '#6b6375', fontWeight: 'bold' }}>{item.codigo}</td>
                <td style={{ padding: '16px', color: '#08060d', fontWeight: '500' }}>{item.nome}</td>
                <td style={{ padding: '16px', color: '#6b6375' }}>{item.categoria}</td>
                <td style={{ padding: '16px', color: '#08060d' }}>{item.preco}</td>
                <td style={{ padding: '16px', color: item.estoque < 10 ? '#d9534f' : '#28a745', fontWeight: 'bold' }}>
                  {item.estoque} un
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}