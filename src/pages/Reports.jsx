import React, { useState, useEffect, useCallback } from 'react';
import '../styles/Reports.css';
import '../styles/Dashboard.css';
import {
  LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';

function moeda(v) {
  if (v == null) return '—';
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v);
}

export default function Relatorios() {
  const navigate = useNavigate();

  const [filtros, setFiltros] = useState({
    de: '',
    ate: '',
    status: '',
  });

  const [metricas, setMetricas] = useState(null);
  const [serie, setSerie] = useState([]);
  const [semanal, setSemanal] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  const carregarDados = useCallback(async () => {
    setCarregando(true);
    setErro('');
    try {
      const params = new URLSearchParams({
        de: filtros.de,
        ate: filtros.ate,
        ...(filtros.status && { status: filtros.status }),
      }).toString();

      const [mRes, sRes, semRes] = await Promise.all([
        api(`/api/v1/relatorios/metricas?${params}`, 'GET'),
        api(`/api/v1/relatorios/serie?${params}`, 'GET'),
        api(`/api/v1/relatorios/semanal?${params}`, 'GET'),
      ]);

      setMetricas(mRes.data);
      setSerie(sRes.data ?? []);
      setSemanal(semRes.data ?? []);
    } catch {
      setErro('Não foi possível carregar os relatórios. Verifique a conexão com o servidor.');
    } finally {
      setCarregando(false);
    }
  }, [filtros]);

  useEffect(() => { carregarDados(); }, [carregarDados]);

  const handleFiltroChange = (e) => {
    const { name, value } = e.target;
    setFiltros((prev) => ({ ...prev, [name]: value }));
  };

  const handleAplicar = (e) => {
    e.preventDefault();
    carregarDados();
  };

  return (
    <div className="relatorios-container">

      {/* ─── Cabeçalho ─── */}
      <div className="relatorios-header">
        <h2 className="relatorios-title">Relatórios</h2>
        <button className="btn-assistente" onClick={() => navigate('/assistant')}>
          Assistente Inteligente
        </button>
      </div>

      {/* ─── Filtros ─── */}
      <form className="relatorios-filtros" onSubmit={handleAplicar}>
        <div className="filtro-campo">
          <label className="filtro-label">De</label>
          <input
            type="date"
            className="filtro-input"
            name="de"
            value={filtros.de}
            onChange={handleFiltroChange}
          />
        </div>
        <div className="filtro-campo">
          <label className="filtro-label">Até</label>
          <input
            type="date"
            className="filtro-input"
            name="ate"
            value={filtros.ate}
            onChange={handleFiltroChange}
          />
        </div>
        <div className="filtro-campo">
          <label className="filtro-label">Status</label>
          <select
            className="filtro-input"
            name="status"
            value={filtros.status}
            onChange={handleFiltroChange}
          >
            <option value="">Todos</option>
            <option value="pendente">Pendente</option>
            <option value="concluida">Finalizada</option>
            <option value="cancelada">Cancelada</option>
          </select>
        </div>
        <button type="submit" className="filtro-btn-aplicar" disabled={carregando}>
          {carregando ? 'Carregando...' : 'Aplicar Filtros'}
        </button>
      </form>

      {erro && (
        <div style={{
          background: '#fff3f3', border: '1px solid #f5c2c2',
          borderRadius: 8, padding: '14px 18px', color: '#c0392b', fontSize: 14,
        }}>
          {erro}
        </div>
      )}

      {/* ─── Cards de KPI ─── */}
      <div className="summary-cards">
        <div className="card">
          <div className="card-title">Faturamento Total</div>
          <div className="card-value">
            {carregando ? '...' : moeda(metricas?.total_faturamento)}
          </div>
        </div>
        <div className="card">
          <div className="card-title">Pedidos Emitidos</div>
          <div className="card-value">
            {carregando ? '...' : (metricas?.total_pedidos ?? 0)}
          </div>
        </div>
        <div className="card">
          <div className="card-title">Ticket Médio</div>
          <div className="card-value">
            {carregando ? '...' : moeda(metricas?.ticket_medio)}
          </div>
        </div>
      </div>

      {/* ─── Gráfico de série diária ─── */}
      <div className="relatorio-chart-card">
        <div className="chart-header">
          <div className="chart-info">
            <h4>Vendas no período</h4>
            <h3>{carregando ? '...' : (metricas?.total_pedidos ?? 0)} vendas</h3>
          </div>
          <div className="chart-info" style={{ textAlign: 'right' }}>
            <h4>Concluídas / Canceladas</h4>
            <h3 style={{ fontSize: 16 }}>
              <span style={{ color: '#2e7d32' }}>{metricas?.pedidos_concluidos ?? 0}</span>
              {' / '}
              <span style={{ color: '#c62828' }}>{metricas?.pedidos_cancelados ?? 0}</span>
            </h3>
          </div>
        </div>

        {serie.length === 0 && !carregando ? (
          <p style={{ color: '#bbb', textAlign: 'center', paddingTop: 40 }}>
            Sem dados para o período selecionado.
          </p>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={serie}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
              <XAxis dataKey="dia" stroke="#888" fontSize={12} />
              <YAxis stroke="#888" fontSize={12} />
              <Tooltip
                contentStyle={{ borderRadius: 10, border: 'none', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}
                formatter={(v) => [v, 'Vendas']}
              />
              <Line
                type="monotone"
                dataKey="quantidade"
                stroke="#20c997"
                strokeWidth={3}
                dot={{ r: 4, fill: '#20c997' }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* ─── Métricas de estoque/status ─── */}
      <div className="relatorios-cards">
        <div className="r-card">
          <div className="r-card-title">Produtos com estoque baixo</div>
          <div className="r-card-value">
            {carregando ? '...' : (metricas?.produtos_estoque_baixo ?? 0)}
          </div>
          {metricas?.produtos_estoque_baixo > 0 && (
            <div className="r-card-indicator indicator-down">Atenção</div>
          )}
        </div>
        <div className="r-card">
          <div className="r-card-title">Pedidos Finalizados</div>
          <div className="r-card-value">
            {carregando ? '...' : (metricas?.pedidos_concluidos ?? 0)}
          </div>
        </div>
        <div className="r-card">
          <div className="r-card-title">Pedidos Cancelados</div>
          <div className="r-card-value">
            {carregando ? '...' : (metricas?.pedidos_cancelados ?? 0)}
          </div>
          {metricas?.pedidos_cancelados > 0 && (
            <div className="r-card-indicator indicator-down">
              {metricas?.total_pedidos > 0
                ? `${((metricas.pedidos_cancelados / metricas.total_pedidos) * 100).toFixed(1)}% do total`
                : ''}
            </div>
          )}
        </div>
      </div>

      {/* ─── Faturamento Semanal ─── */}
      <div className="chart-container" style={{ height: 320 }}>
        <h3 className="chart-title">Faturamento Semanal</h3>

        {semanal.length === 0 && !carregando ? (
          <p style={{ color: '#bbb', textAlign: 'center', paddingTop: 40 }}>
            Sem dados para o período selecionado.
          </p>
        ) : (
          <ResponsiveContainer width="100%" height="85%">
            <BarChart data={semanal}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
              <XAxis dataKey="semana" stroke="#888" fontSize={12} />
              <YAxis stroke="#888" fontSize={12} tickFormatter={(v) => `R$ ${v}`} />
              <Tooltip
                formatter={(v) => [moeda(v), 'Faturamento']}
                contentStyle={{ borderRadius: 10, border: 'none', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}
              />
              <Bar dataKey="total" fill="#FF7F2A" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

    </div>
  );
}
