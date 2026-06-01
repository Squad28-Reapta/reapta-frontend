import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';
import logoImg from '../assets/logo-reapta-fundo-transparente.png';
import { loginUser } from '../services/auth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErro('');
    setCarregando(true);

    try {
      const resposta = await loginUser(email, password);

      if (resposta.success) {
        localStorage.setItem('token', resposta.data.token);
        localStorage.setItem('nome', resposta.data.usuario.nome)
        navigate('/dashboard');
      }
    } catch (err) {
      setErro(err.message || 'Email ou senha inválidos');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <main className="login-container">
      <div className="login-card">
        
        <div className="logo-container">
          <img src={logoImg} alt="Logo Reapta" className="logo-image" />
        </div>
        
        <h2 className="welcome-text">Bem-vindo!</h2>
        
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <input 
              type="email" 
              placeholder="Email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          
          <div className="input-group">
            <input 
              type="password" 
              placeholder="Senha" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>

          {erro && <p style={{ color: 'red', fontSize: '14px' }}>{erro}</p>}
          
          <div className="forgot-password">
            <a href="#" onClick={() => navigate('/Forgot-password')}>Esqueceu a senha?</a>
          </div>
          
          <button type="submit" className="btn-entrar" disabled={carregando}>
            {carregando ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </main>
  );
}