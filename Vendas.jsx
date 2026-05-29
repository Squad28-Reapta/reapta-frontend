import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import '../styles/Dashboard.css';

export default function Vendas() {
  const dadosVendas = [
    { name: 'Semana 1', total: 12000 },
    { name: 'Semana 2', total: 19000 },
    { name: 'Semana 3', total: 15000 },
    { name: 'Semana 4', total: 28000 },
  ];

  return (
    <div className="dashboard-container">
      <div>
        <h2 className="dashboard-title" style={{ margin: 0 }}>Histórico Comercial</h2>
        <p style={{ margin: '4px 0 0 0', color: '#666', fontSize: '14px' }}>Resultados financeiros de vendas consolidadas</p>
      </div>

      {/* Cards Superiores herdando as propriedades do grupo */}
      <div className="summary-cards">
        <div className="card">
          <div className="card-title">Faturamento Total</div>
          <div className="card-value">R$ 74.000,00</div>
        </div>
        
        <div className="card">
          <div className="card-title">Pedidos Emitidos</div>
          <div className="card-value">184</div>
        </div>
        
        <div className="card">
          <div className="card-title">Ticket Médio Geral</div>
          <div className="card-value">R$ 402,17</div>
        </div>
      </div>

      {/* Box do Gráfico de Performance */}
      <div className="chart-container" style={{ height: '350px' }}>
        <h3 className="chart-title" style={{ marginBottom: '15px' }}>Faturamento Semanal</h3>
        
        <ResponsiveContainer width="100%" height="85%">
          <BarChart data={dadosVendas}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
            <XAxis dataKey="name" stroke="#888" fontSize={13} />
            <YAxis stroke="#888" fontSize={13} tickFormatter={(value) => `R$ ${value}`} />
            <Tooltip 
              formatter={(value) => [`R$ ${value}`, 'Faturamento']}
              contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}
            />
            <Bar dataKey="total" fill="#FF7F2A" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}