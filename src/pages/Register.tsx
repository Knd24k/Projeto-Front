import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuth } from '../contexts/AuthContext';

const Register: React.FC = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length > 8) {
      setError('A senha deve ter no máximo 8 caracteres.');
      return;
    }
    const success = register(nickname, email.trim().toLowerCase(), password);
    if (success) {
      navigate('/');
    } else {
      setError('Email já cadastrado.');
    }
  };

  return (
    <>
      <Header />
      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Cadastro</h2>
          <label htmlFor="nickname">Nickname:</label>
          <input id="nickname" type="text" placeholder="Nickname" value={nickname} onChange={e => setNickname(e.target.value)} required />
          <label htmlFor="email">Email:</label>
          <input id="email" type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
          <label htmlFor="password">Senha (até 8 chars):</label>
          <input id="password" type="password" placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)} maxLength={8} required />
          <button type="submit">Cadastrar</button>
          {error && <p className="login-error">{error}</p>}
          <p style={{ marginTop: '10px', textAlign: 'center' }}>
            Já tem conta? <Link to="/login">Faça login aqui</Link>
          </p>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Register;