import React from 'react';
import '../styles/Relatorios.css';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';

export default function Relatorios() {
  // Dados simulados para o gráfico de relatório
  const mockData = [
    { dia: '01', vendas: 12 },
    { dia: '05', vendas: 19 },
    { dia: '10', vendas: 15 },
    { dia: '15', vendas: 25 },
    { dia: '20', vendas: 22 },
    { dia: '25', vendas: 30 },
    { dia: '28', vendas: 78 },
  ];

  return (
    <div className="relatorios-container">
      {/* Cabeçalho com o botão do Assistente */}
      <div className="relatorios-header">
        <h2 className="relatorios-title">Relatórios</h2>
        <button className="btn-assistente">Falar com Assistente Inteligente</button>
      </div>

      {/* Gráfico Principal */}
      <div className="relatorio-chart-card">
        <div className="chart-header">
          <div className="chart-info">
            <h4>Neste mês</h4>
            <h3>78 vendas</h3>
          </div>
          <div className="chart-info" style={{ textAlign: 'right' }}>
            <h4>Total do dia 28</h4>
            <h3 style={{ color: '#28a745' }}>+ 5,2%</h3>
          </div>
        </div>
        
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={mockData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
            <XAxis dataKey="dia" stroke="#888" />
            <YAxis stroke="#888" />
            <Tooltip 
              contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}
            />
            <Line 
              type="monotone" 
              dataKey="vendas" 
              stroke="#20c997" /* Cor verde água similar ao do Figma */
              strokeWidth={3} 
              dot={{ r: 4, fill: '#20c997' }} 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Cards de Métricas Inferiores */}
      <div className="relatorios-cards">
        <div className="r-card">
          <div className="r-card-title">Produtos com estoque baixo</div>
          <div className="r-card-value">150</div>
          <div className="r-card-indicator indicator-up">+ 2,0%</div>
        </div>
        
        <div className="r-card">
          <div className="r-card-title">Produtos entregues</div>
          <div className="r-card-value">527</div>
          <div className="r-card-indicator indicator-down">- 1,5%</div>
        </div>
        
        <div className="r-card">
          <div className="r-card-title">Pedidos cancelados</div>
          <div className="r-card-value">140</div>
          <div className="r-card-indicator indicator-up">+ 1,0%</div>
        </div>
      </div>
    </div>
  );
}