import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      console.log("LOGIN")
      const response = await axios.post('http://localhost:5000/api/auth/login', { username, password });
      console.log(username, password, response.data)
    
      console.log('Resposta do login:', response);
      localStorage.setItem('token', response.data.token);
      setIsAuthenticated(true); 
    } catch (error) {
      console.error('Erro ao fazer login', error.response || error);
      if (error.response) {
        console.log('Resposta de erro:', error.response);
        setError(error.response.data.message || 'Erro ao fazer login. Tente novamente.');
      } else {
        setError('Erro de rede. Tente novamente.');
      }
    }
  };

  return (
    <div>
      <h3>Login</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Exibe o erro se houver */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default Login;
