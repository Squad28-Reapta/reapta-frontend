import React, { useState } from 'react';
import '../styles/Login.css';
import logoImg from '../assets/logo-reapta-fundo-transparente.png';
import { forgotPassword } from '../services/auth';  
import { useNavigate } from 'react-router-dom';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate(); 

  const handleSend = async (e) => {
    e.preventDefault();

    try {
      const response = await forgotPassword(email);
      if (response.success) {
        alert('Código enviado para seu email!');
        localStorage.setItem('resetEmail', email);
        navigate('/verify-code');
      } else {
        alert('Erro ao enviar código. Tente novamente.');
      }
    } catch (error) {
      alert('Erro ao enviar código: ' + error.message);
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