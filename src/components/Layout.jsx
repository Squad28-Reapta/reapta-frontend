import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/Layout.css';
import logoImg from '../assets/logo-reapta-fundo-transparente.png';

const MENU = [
  { path: '/dashboard', label: 'Dashboard' },
  { path: '/sales',     label: 'Vendas' },
  { path: '/products',  label: 'Produtos' },
  { path: '/customers', label: 'Clientes' },
  { path: '/reports',   label: 'Relatórios' },
  { path: '/assistant', label: 'Assistente' },
];

export default function Layout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const nome = localStorage.getItem('nome');
  const [sidebarAberta, setSidebarAberta] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('nome');
    navigate('/login');
  };

  const navegar = (path) => {
    navigate(path);
    setSidebarAberta(false);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="app-layout">

      {/* Overlay mobile */}
      {sidebarAberta && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarAberta(false)}
          aria-hidden="true"
        />
      )}

      <aside className={`sidebar${sidebarAberta ? ' sidebar--aberta' : ''}`}>
        <div className="sidebar-logo">
          <img src={logoImg} alt="Logo Reapta" />
        </div>

        <nav className="sidebar-menu">
          {MENU.map(({ path, label }) => (
            <button
              key={path}
              className={`menu-item${isActive(path) ? ' active' : ''}`}
              onClick={() => navegar(path)}
            >
              {label}
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button className="btn-logout" onClick={handleLogout}>
            Sair do Sistema
          </button>
        </div>
      </aside>

      <div className="main-content">
        <header className="header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button
              className="hamburger"
              onClick={() => setSidebarAberta((v) => !v)}
              aria-label="Abrir menu"
            >
              <span /><span /><span />
            </button>
            <div className="user-welcome">
              Olá, <strong>{nome}</strong>
            </div>
          </div>
          <div className="system-tag">Painel Administrativo</div>
        </header>

        <main className="page-container">
          {children}
        </main>
      </div>

    </div>
  );
}
