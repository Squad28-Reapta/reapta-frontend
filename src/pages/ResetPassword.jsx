import React, { useState } from 'react';
import '../styles/Login.css';
import logoImg from '../assets/logo-reapta-fundo-transparente.png';
import { useNavigate } from 'react-router-dom';
import { resetPassword } from '../services/auth';

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert('As senhas não coincidem. Tente novamente.');
      return;
    }

    const resetToken = localStorage.getItem('resetToken');

    try {
      const response = await resetPassword(resetToken, newPassword);
      if (response.success) {
        localStorage.removeItem('resetToken');
        localStorage.removeItem('resetEmail');
        navigate('/reset-success');
      } else {
        alert('Erro ao redefinir senha. Tente novamente.');
      }
    } catch (error) {
      alert('Erro ao redefinir senha: ' + error.message);
    }
    
  };

  return (
    <main className="login-container">
      <div className="login-card">
        <div className="logo-container">
          <img src={logoImg} alt="Logo Reapta" className="logo-image" />
        </div>
        
        <h2 className="welcome-text">Redefinição de senha</h2>
        <p style={{ color: 'white', marginBottom: '20px', fontSize: '14px' }}>
          Digite a nova senha.
        </p>
        
        <form onSubmit={handleReset}>
          <div className="input-group">
            <input 
              type="password" 
              placeholder="Nova senha" 
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required 
            />
          </div>
          <div className="input-group">
            <input 
              type="password" 
              placeholder="Confirmar senha" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required 
            />
          </div>
          
          <button type="submit" className="btn-entrar">Confirmar</button>
        </form>
      </div>
    </main>
  );
}