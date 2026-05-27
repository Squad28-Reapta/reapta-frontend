import React from 'react';
import '../styles/Login.css';
import logoImg from '../assets/logo-reapta-fundo-transparente.png';
import { useNavigate } from 'react-router-dom';

export default function ResetSuccess() {
  const navigate = useNavigate();

  const handleBackToLogin = () => {
    navigate('/login');
  };

  return (
    <main className="login-container">
      <div className="login-card">
        <div className="logo-container">
          <img src={logoImg} alt="Logo Reapta" className="logo-image" />
        </div>
        
        <h2 className="welcome-text" style={{ fontSize: '20px' }}>
          Senha redefinida com sucesso!
        </h2>
        
        <button className="btn-entrar" style={{ marginTop: '15px' }} onClick={handleBackToLogin}>
          Voltar para o login
        </button>
      </div>
    </main>
  );
}