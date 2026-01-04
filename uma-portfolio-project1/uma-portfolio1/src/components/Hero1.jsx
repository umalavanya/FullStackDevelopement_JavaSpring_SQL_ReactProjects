import React from 'react';
import { FaGithub, FaLinkedin, FaCode, FaDatabase } from 'react-icons/fa';

const Hero = () => {
  return (
    <section id="home" className="animate-gradient" style={{
      background: 'linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)',
      backgroundSize: '400% 400%'
    }}>
      <div className="container">
        <div className="stagger-animation">
          <div style={{ animationDelay: '0.1s' }}>
            <h1 style={{ 
              fontSize: '4rem', 
              fontWeight: 800,
              marginBottom: '1rem',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
                Uma Lavanya Chintapanti
                
              
            </h1>
            <h3>Full Stack Developer</h3>
          </div>
          
          <div style={{ animationDelay: '0.2s' }}>
            <p style={{ 
              fontSize: '1.5rem', 
              marginBottom: '2rem',
              opacity: 0.9 
            }}>
              Crafting robust solutions with Java Spring Boot, React, and SQL
            </p>
          </div>
          
          <div style={{ animationDelay: '0.3s' }} className="animate-float">
            <div style={{
              display: 'flex',
              gap: '2rem',
              justifyContent: 'center',
              margin: '3rem 0'
            }}>
              <FaCode size={60} style={{ color: 'white', opacity: 0.8 }} />
              <FaDatabase size={60} style={{ color: 'white', opacity: 0.8 }} />
            </div>
          </div>
          
          <div style={{ animationDelay: '0.4s' }}>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="#projects" className="btn btn-primary">
                View My Projects
              </a>
              <a href="#contact" className="btn btn-secondary">
                Contact Me
              </a>
            </div>
          </div>
          
          <div style={{ animationDelay: '0.5s' }}>
            <div className="social-links" style={{ marginTop: '3rem' }}>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-icon hover-lift">
                <FaGithub size={28} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon hover-lift">
                <FaLinkedin size={28} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;