import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuth } from '../contexts/AuthContext';

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(email.trim().toLowerCase(), password);
    if (success) {
      navigate('/');
    } else {
      setError('Email ou senha inválidos.');
    }
  };

  return (
    <>
      <Header />
      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Login</h2>
          <label htmlFor="email">Email:</label>
          <input id="email" type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
          <label htmlFor="password">Senha (até 8 chars):</label>
          <input id="password" type="password" placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)} maxLength={8} required />
          <button type="submit">Entrar</button>
          {error && <p className="login-error">{error}</p>}
          <p style={{ marginTop: '10px', textAlign: 'center' }}>
            Não tem conta? <Link to="/register">Cadastre-se aqui</Link>
          </p>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Login;