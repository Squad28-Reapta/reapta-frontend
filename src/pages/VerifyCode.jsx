import React, { useState } from 'react';
import '../styles/Login.css';
import logoImg from '../assets/logo-reapta-fundo-transparente.png';

export default function VerifyCode() {
  const [code, setCode] = useState('');

  const handleVerify = (e) => {
    e.preventDefault();
    console.log("Verificando código:", code);
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