import { useState, useEffect } from 'react';
import './App.css';
import Calculator from './components/Calculator';

function App() {
  const [particles, setParticles] = useState([]);

  // Create particles for background
  useEffect(() => {
    const particlesArray = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      size: Math.random() * 3 + 1,
      left: Math.random() * 100,
      duration: Math.random() * 10 + 15,
      delay: Math.random() * 15
    }));
    setParticles(particlesArray);
  }, []);

  return (
    <div className="app">
      {/* Animated background particles */}
      <div className="particles-container">
        {particles.map(particle => (
          <div 
            key={particle.id}
            className="particle"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              left: `${particle.left}%`,
              animationDuration: `${particle.duration}s`,
              animationDelay: `-${particle.delay}s`
            }}
          />
        ))}
      </div>

      <div className="header-container floating">
        <h1 className="text-gradient glow-effect">
          <span className="shimmer">Scientific Calculator</span>
        </h1>
        <p className="subtitle">Advanced Mathematics at Your Fingertips</p>
      </div>
      
      <div className="calculator-container glow-effect">
        <Calculator />
      </div>
      
      <div className="footer">
        <div className="features">
          <span className="feature">📱 Responsive Design</span>
          <span className="feature">⌨️ Keyboard Support</span>
          <span className="feature">🎯 Advanced Functions</span>
          <span className="feature">✨ Smooth Animations</span>
        </div>
        <p>Built with React & Vite • Professional Edition</p>
      </div>
    </div>
  );
}

export default App;