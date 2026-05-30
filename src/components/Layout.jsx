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

  const isActive = (path) => location.pathname === path;

  return (
    <div className="app-layout">
      
      <aside className="sidebar">
        <div className="sidebar-logo">
          <img src={logoImg} alt="Logo Reapta" />
        </div>

        <nav className="sidebar-menu">
          <button
            className={`menu-item${isActive('/dashboard') ? ' active' : ''}`}
            onClick={() => navigate('/dashboard')}
          >
            Dashboard
          </button>
          <button
            className={`menu-item${isActive('/sales') ? ' active' : ''}`}
            onClick={() => navigate('/sales')}
          >
            Vendas
          </button>
          <button
            className={`menu-item${isActive('/products') ? ' active' : ''}`}
            onClick={() => navigate('/products')}
          >
            Produtos
          </button>
          <button
            className={`menu-item${isActive('/reports') ? ' active' : ''}`}
            onClick={() => navigate('/reports')}
          >
            Relatórios
          </button>
          <button
            className={`menu-item${isActive('/assistant') ? ' active' : ''}`}
            onClick={() => navigate('/assistant')}
          >
            Assistente
          </button>
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
