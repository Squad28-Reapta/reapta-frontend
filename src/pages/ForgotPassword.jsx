import React, { useState } from 'react';
import '../styles/Login.css';
import logoImg from '../assets/logo-reapta-fundo-transparente.png';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    console.log("Enviando código para:", email);
  };

  return (
    <main className="login-container">
      <div className="login-card">
        <div className="logo-container">
          <img src={logoImg} alt="Logo Reapta" className="logo-image" />
        </div>
        
        <h2 className="welcome-text">Redefinição de senha</h2>
        <p style={{ color: 'white', marginBottom: '20px', fontSize: '14px' }}>
          Enviaremos um código para seu e-mail.
        </p>
        
        <form onSubmit={handleSend}>
          <div className="input-group">
            <input 
              type="email" 
              placeholder="Email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          
          <button type="submit" className="btn-entrar">Enviar</button>
        </form>
      </div>
    </main>
  );
}