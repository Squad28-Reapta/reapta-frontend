import React from 'react';
import '../styles/Dashboard.css';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';

export default function Dashboard() {
  // Dados simulados para o gráfico (no futuro virão do banco de dados)
  const mockData = [
    { mes: 'Jan', valor: 4000 },
    { mes: 'Fev', valor: 3000 },
    { mes: 'Mar', valor: 5000 },
    { mes: 'Abr', valor: 4500 },
    { mes: 'Mai', valor: 6000 },
    { mes: 'Jun', valor: 7500 },
  ];

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Dashboard</h2>

      {/* Cards Superiores */}
      <div className="summary-cards">
        <div className="card">
          <div className="card-title">Total de Vendas (Mês)</div>
          <div className="card-value">150</div>
        </div>
        
        <div className="card">
          <div className="card-title">Produtos em Estoque</div>
          <div className="card-value">527</div>
        </div>
        
        <div className="card">
          <div className="card-title">Usuários Ativos</div>
          <div className="card-value">140</div>
        </div>
      </div>

      {/* Gráfico Principal */}
      <div className="chart-container">
        <h3 className="chart-title">Receita Mensal</h3>
        
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={mockData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
            <XAxis dataKey="mes" stroke="#888" />
            <YAxis stroke="#888" tickFormatter={(value) => `R$ ${value}`} />
            <Tooltip 
              formatter={(value) => [`R$ ${value}`, 'Receita']}
              contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}
            />
            <Line 
              type="monotone" 
              dataKey="valor" 
              stroke="#FF7F2A" 
              strokeWidth={4} 
              dot={{ r: 6, fill: '#FF7F2A' }} 
              activeDot={{ r: 8 }} 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}