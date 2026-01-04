import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import ParticleBackground from './components/ParticleBackground'; // Add this

function App() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.body.className = `${savedTheme}-theme`;
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.body.className = `${newTheme}-theme`;
  };

  return (
    <div className="App">
      {/* Add ParticleBackground here */}
      <ParticleBackground theme={theme} />
      
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Hero />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <footer className="footer" style={{ 
        padding: '2rem 0',
        borderTop: '1px solid var(--border-color)'
      }}>
        <div className="container">
          <p style={{ color: 'var(--text-secondary)' }}>
            © {new Date().getFullYear()} Full Stack Developer Portfolio. All rights reserved.
          </p>
          <p style={{ 
            marginTop: '1rem',
            fontSize: '0.9rem',
            color: 'var(--text-secondary)'
          }}>
            Built with React, Spring Boot, and passion for clean code.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;