import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg('');
    setErrorMsg('');

    try {
      const res = await axios.post('/api/auth/login', formData);
      console.log('Login Response:', res.data); // 🔍 debug

      const { user, token } = res.data;
      console.log('User:', user); // 🔍 debug
      if (user && token) {
        login(user, token); // Save user and token in context
        setSuccessMsg('✅ Login successful!');
        setTimeout(() => navigate('/'), 1500);
      } else {
        setErrorMsg('Invalid response from server');
      }
    } catch (err) {
      console.error('Login Error:', err.response?.data || err.message); // 🔍 debug
      setErrorMsg(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        autoComplete="email"
        value={formData.email}
        onChange={e => setFormData({ ...formData, email: e.target.value })}
        required
      />

      <input
        type="password"
        placeholder="Password"
        autoComplete="current-password"
        value={formData.password}
        onChange={e => setFormData({ ...formData, password: e.target.value })}
        required
      />

      <button type="submit">Login</button>

      {successMsg && <div className="success-msg">{successMsg}</div>}
      {errorMsg && <div className="error-msg">{errorMsg}</div>}
    </form>
  );
}

export default Login;
