import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/Layout.css';
import logoImg from '../assets/logo-reapta-fundo-transparente.png';

export default function Layout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="app-layout">
      
      <aside className="sidebar">
        <div className="sidebar-logo">
          <img src={logoImg} alt="Logo Reapta" />
        </div>

        <nav className="sidebar-menu">
          <button 
            className={`menu-item ${location.pathname === '/dashboard' ? 'active' : ''}`}
            onClick={() => navigate('/dashboard')}
          >
            Dashboard
          </button>
          <button 
            className={`menu-item ${location.pathname === '/vendas' || location.pathname === '/novas-vendas' ? 'active' : ''}`}
            onClick={() => navigate('/vendas')}
          >
            Vendas
          </button>
          <button 
            className={`menu-item ${location.pathname === '/produtos' ? 'active' : ''}`}
            onClick={() => navigate('/produtos')}
          >
            Produtos
          </button>
          <button className="menu-item">Usuários</button>
          <button className="menu-item">Relatórios</button>
        </nav>

        <div className="sidebar-footer">
          <button className="btn-logout" onClick={handleLogout}>
            Sair do Sistema
          </button>
        </div>
      </aside>

      <div className="main-content">
        <header className="header">
          <div className="user-welcome">
            Olá, <strong>Usuário</strong>
          </div>
          <div className="system-tag">
            Painel Administrativo
          </div>
        </header>

        <main className="page-container">
          {children}
        </main>
      </div>

    </div>
  );
}