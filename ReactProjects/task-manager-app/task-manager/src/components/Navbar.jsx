import React from 'react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav style={{
      background: 'var(--card-bg)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
      padding: '15px 0',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      <div className="container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '15px'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            background: 'var(--gradient-primary)',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            color: 'white',
            fontSize: '20px'
          }}>
            T
          </div>
          <h1 style={{
            fontSize: '24px',
            background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 'bold'
          }}>
            TaskFlow Pro
          </h1>
        </div>

        {user && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <div style={{
                width: '36px',
                height: '36px',
                background: 'var(--gradient-primary)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold'
              }}>
                {user.name.charAt(0).toUpperCase()}
              </div>
              <span style={{ fontWeight: '600' }}>{user.name}</span>
            </div>
            <button
              onClick={logout}
              className="btn btn-secondary"
              style={{ padding: '8px 16px', fontSize: '14px' }}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;