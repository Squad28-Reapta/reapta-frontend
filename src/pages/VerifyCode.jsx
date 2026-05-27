import React, { useState } from 'react';
import '../styles/Login.css';
import logoImg from '../assets/logo-reapta-fundo-transparente.png';
import { verifyCode } from '../services/auth';
import { useNavigate } from 'react-router-dom';

export default function VerifyCode() {
  const [code, setCode] = useState('');
  const navigate = useNavigate();

  const handleVerify = async (e) => {
    e.preventDefault();
    const email = localStorage.getItem('resetEmail');
    const response = await verifyCode(email, code);

    if (response.success) {
      localStorage.setItem('resetToken', response.data.resetToken);
      alert('Código verificado! Agora você pode redefinir sua senha.');
      navigate('/reset-password');
    } else {
      alert('Código inválido. Tente novamente.');
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
          Digite o código que foi enviado ao seu e-mail.
        </p>
        
        <form onSubmit={handleVerify}>
          <div className="input-group">
            <input 
              type="text" 
              placeholder="Código" 
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required 
            />
          </div>
          
          <button type="submit" className="btn-entrar">Enviar</button>
        </form>
      </div>
    </main>
  );
}