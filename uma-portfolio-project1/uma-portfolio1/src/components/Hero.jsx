import React from 'react';
import FloatingDots from './FloatingDots'; // Import the component

const Hero = ({ theme }) => {
  return (
    <section 
      id="home" 
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: theme === 'light' 
          ? 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
          : 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center'
      }}
    >
      {/* Add Floating Dots Background */}
      <FloatingDots theme={theme} />
      
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="stagger-animation">
          <div style={{ animationDelay: '0.1s' }}>
            <h1 style={{ 
              fontSize: '4rem', 
              fontWeight: 800,
              marginBottom: '1rem',
              background: theme === 'light'
                ? 'linear-gradient(135deg, #FF006E 0%, #FFBE0B 25%, #3A86FF 50%, #8338EC 75%, #00F5D4 100%)'
                : 'linear-gradient(135deg, #FF006E 0%, #FFBE0B 25%, #3A86FF 50%, #8338EC 75%, #00F5D4 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundSize: '200% 200%',
              animation: 'gradient 8s ease infinite'
            }}>
              Full Stack Developer
            </h1>
          </div>
          
          <div style={{ animationDelay: '0.2s' }}>
            <p style={{ 
              fontSize: '1.5rem', 
              marginBottom: '2rem',
              color: theme === 'light' ? '#2d3436' : '#e6e6e6',
              fontWeight: 300
            }}>
              Crafting robust solutions with Java Spring Boot, React, and SQL
            </p>
          </div>
          
          <div style={{ animationDelay: '0.3s' }}>
            <div style={{
              display: 'flex',
              gap: '2rem',
              justifyContent: 'center',
              margin: '3rem 0'
            }}>
              {/* Your existing code */}
            </div>
          </div>
          
          {/* Rest of your Hero component */}
        </div>
      </div>
      
      {/* Add CSS for gradient animation */}
      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </section>
  );
};

export default Hero;