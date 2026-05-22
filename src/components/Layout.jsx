import React from 'react';
import '../styles/Layout.css';
import logoImg from '../assets/logo-reapta-fundo-transparente.png';

export default function Layout({ children }) {
  return (
    <div className="app-layout">
      
      {/* Barra Lateral de Navegação */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <img src={logoImg} alt="Logo Reapta" />
        </div>

        <nav className="sidebar-menu">
          <button className="menu-item active">Dashboard</button>
          <button className="menu-item">Vendas</button>
          <button className="menu-item">Produtos</button>
          <button className="menu-item">Usuários</button>
          <button className="menu-item">Relatórios</button>
        </nav>

        <div className="sidebar-footer">
          <button className="btn-logout" onClick={() => console.log('Saindo...')}>
            Sair do Sistema
          </button>
        </div>
      </aside>

      {/* Bloco Direito: Cabeçalho + Conteúdo da Tela */}
      <div className="main-content">
        <header className="header">
          <div className="user-welcome">
            Olá, <strong>Usuário</strong>
          </div>
          <div className="system-tag">
            Painel Administrativo
          </div>
        </header>

        {/* Aqui dentro vai renderizar a página específica (ex: Dashboard) */}
        <main className="page-container">
          {children}
        </main>
      </div>

    </div>
  );
}