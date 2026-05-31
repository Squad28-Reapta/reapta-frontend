import React from 'react';
import '../styles/Reports.css';
import '../styles/Dashboard.css';
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { useNavigate } from 'react-router-dom';

export default function Relatorios() {
  const navigate = useNavigate();
  // Dados do Sales.jsx — Histórico Comercial
  const dadosSales = [
    { name: 'Semana 1', total: 12000 },
    { name: 'Semana 2', total: 19000 },
    { name: 'Semana 3', total: 15000 },
    { name: 'Semana 4', total: 28000 },
  ];

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

  const handleAssistenteClick = () => {
    navigate('/assistant');
  }

  return (
    <div className="relatorios-container">
      {/* Cabeçalho com o botão do Assistente */}
      <div className="relatorios-header">
        <h2 className="relatorios-title">Relatórios</h2>
        <button className="btn-assistente" onClick={handleAssistenteClick}>
          Falar com Assistente Inteligente
        </button>
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

      {/* ── Seção de Histórico Comercial (migrado de Sales.jsx) ── */}
      <div>
        <h2 className="dashboard-title" style={{ margin: 0 }}>Histórico Comercial</h2>
        <p style={{ margin: '4px 0 0 0', color: '#666', fontSize: '14px' }}>Resultados financeiros de vendas consolidadas</p>
      </div>

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

      <div className="chart-container" style={{ height: '350px' }}>
        <h3 className="chart-title" style={{ marginBottom: '15px' }}>Faturamento Semanal</h3>

        <ResponsiveContainer width="100%" height="85%">
          <BarChart data={dadosSales}>
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
