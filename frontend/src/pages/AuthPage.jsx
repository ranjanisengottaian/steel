// src/pages/AuthPage.js

import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { CountrySelect, StateSelect } from 'react-country-state-city';
import 'react-country-state-city/dist/react-country-state-city.css';
import './AuthPage.css';

function AuthPage() {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
    country: '',
    state: ''
  });
  const [countryId, setCountryId] = useState(null);
  const [stateId, setStateId] = useState(null);
  const [message, setMessage] = useState({ type: '', text: '' });

  const { login } = useAuth();
  const navigate = useNavigate();

  const toggleMode = () => {
    setIsRegister(!isRegister);
    setFormData({
      name: '',
      email: '',
      password: '',
      address: '',
      country: '',
      state: ''
    });
    setCountryId(null);
    setStateId(null);
    setMessage({ type: '', text: '' });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    if (isRegister && (!formData.address || !formData.country || !formData.state)) {
      return setMessage({ type: 'error', text: 'Please fill in all required fields' });
    }

    const url = isRegister
      ? 'http://localhost:5000/api/auth/register'
      : 'http://localhost:5000/api/auth/login';

    try {
      const payload = isRegister
        ? formData
        : { email: formData.email, password: formData.password };

      const res = await axios.post(url, payload);

      if (isRegister) {
        setMessage({ type: 'success', text: res.data.message || 'Registered successfully' });
      } else {
        login(res.data.user, res.data.token);
        setMessage({ type: 'success', text: 'Login successful!' });
        setTimeout(() => navigate('/'), 1500);
      }
    } catch (err) {
      setMessage({
        type: 'error',
        text: err.response?.data?.message || (isRegister ? 'Registration failed' : 'Login failed'),
      });
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>{isRegister ? 'Register' : 'Login'}</h2>

        <form className="auth-form" onSubmit={handleSubmit}>
          {isRegister && (
            <>
              <input
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <textarea
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                required
              />
              <CountrySelect
                value={formData.country}
                onChange={(e) => {
                  setCountryId(e.id);
                  setFormData({ ...formData, country: e.name });
                }}
                placeHolder="Select Country"
              />
              <StateSelect
                countryid={countryId}
                value={formData.state}
                onChange={(e) => {
                  setStateId(e.id);
                  setFormData({ ...formData, state: e.name });
                }}
                placeHolder="Select State"
              />
            </>
          )}
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit">{isRegister ? 'Register' : 'Login'}</button>
        </form>

        {message.text && (
          <div className={message.type === 'error' ? 'error-msg' : 'success-msg'}>
            {message.text}
          </div>
        )}

        <p className="toggle-text">
          {isRegister ? 'Already have an account?' : "Don't have an account?"}
          <button onClick={toggleMode}>
            {isRegister ? 'Login here' : 'Register here'}
          </button>
        </p>
      </div>
    </div>
  );
}

export default AuthPage;
