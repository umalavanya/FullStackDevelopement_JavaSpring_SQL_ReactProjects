import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (login(email, password)) {
      // Redirect handled by parent component
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="page-container">
      <div style={{
        maxWidth: '400px',
        margin: '0 auto',
        padding: '40px',
        background: 'var(--card-bg)',
        borderRadius: '24px',
        boxShadow: 'var(--shadow-lg)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.2)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div style={{
            width: '60px',
            height: '60px',
            background: 'var(--gradient-primary)',
            borderRadius: '15px',
            margin: '0 auto 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <span style={{ color: 'white', fontSize: '24px' }}>✓</span>
          </div>
          <h2 style={{ 
            fontSize: '28px',
            background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '10px'
          }}>
            Welcome Back
          </h2>
          <p style={{ color: 'var(--gray-dark)' }}>
            Sign in to manage your tasks
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {error && (
            <div style={{
              padding: '12px',
              background: 'rgba(245, 101, 101, 0.1)',
              border: '1px solid var(--danger-color)',
              borderRadius: '12px',
              marginBottom: '20px',
              color: 'var(--danger-color)',
              textAlign: 'center'
            }}>
              {error}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', marginTop: '10px' }}
          >
            Sign In
          </button>

          <div style={{ 
            textAlign: 'center', 
            marginTop: '20px',
            color: 'var(--gray-medium)',
            fontSize: '14px'
          }}>
            <p>Demo Credentials:</p>
            <p>Email: user@example.com</p>
            <p>Password: any password works</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;