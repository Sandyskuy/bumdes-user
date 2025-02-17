import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import "./login.css";

function Login() {
  const navigate = useNavigate();
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!loginIdentifier || !password) {
      setErrorMessage('Harap masukkan email, username, atau nomor telepon dan password.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    try {
      const response = await axios.post('http://localhost:8080/api/login', {
        login: loginIdentifier, // Send login identifier to backend
        password
      });

      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        navigate('/');
      } else {
        setErrorMessage(response.data.error || 'Login gagal. Silakan coba lagi.');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Terjadi kesalahan saat melakukan login.');
    }

    setIsLoading(false);
  };

  return (
    <div className="container-login">
      <div className="login-form">
        <h2>Login</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form onSubmit={handleLogin}>
          <div>
            <label>Email, Username, or Phone:</label>
            <input
              type="text"
              value={loginIdentifier}
              onChange={(e) => setLoginIdentifier(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Login'}
          </button>
        </form>
        <div className="signup-text">
          <p>Belum punya akun? <Link to="/register">Daftar di sini</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Login;
