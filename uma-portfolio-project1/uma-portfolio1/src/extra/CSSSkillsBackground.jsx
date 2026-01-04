import React, { useEffect, useState } from 'react';
import './SkillsBackground.css';

const CSSSkillsBackground = ({ theme }) => {
  const [spheres, setSpheres] = useState([]);

  useEffect(() => {
    const createSpheres = () => {
      const sphereCount = 8;
      const newSpheres = Array.from({ length: sphereCount }, (_, i) => ({
        id: i,
        size: Math.random() * 100 + 50,
        left: Math.random() * 100,
        top: Math.random() * 100,
        blur: Math.random() * 40 + 20,
        duration: Math.random() * 30 + 20,
        delay: Math.random() * 5,
        color: getRandomColor(),
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
      }));
      setSpheres(newSpheres);
    };

    const getRandomColor = () => {
      const colors = [
        '#FF006E', '#FFBE0B', '#3A86FF', '#8338EC', '#00F5D4',
        '#FB5607', '#00CECB', '#FF5E5B', '#9B5DE5', '#118AB2'
      ];
      return colors[Math.floor(Math.random() * colors.length)];
    };

    createSpheres();

    const handleResize = () => {
      createSpheres();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [theme]);

  return (
    <div className="skills-background">
      {spheres.map((sphere) => (
        <div
          key={sphere.id}
          className="glowing-sphere"
          style={{
            '--size': `${sphere.size}px`,
            '--blur': `${sphere.blur}px`,
            '--color': sphere.color,
            left: `${sphere.left}%`,
            top: `${sphere.top}%`,
            animation: `
              float ${sphere.duration}s ease-in-out infinite,
              pulse ${sphere.duration * 0.7}s ease-in-out infinite,
              colorShift ${sphere.duration * 3}s linear infinite
            `,
            animationDelay: `${sphere.delay}s`,
          }}
        />
      ))}
      
      {/* Add connection lines */}
      <svg className="connections" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
        {spheres.map((sphere, i) =>
          spheres.slice(i + 1).map((otherSphere, j) => (
            <line
              key={`${sphere.id}-${otherSphere.id}`}
              x1={`${sphere.left}%`}
              y1={`${sphere.top}%`}
              x2={`${otherSphere.left}%`}
              y2={`${otherSphere.top}%`}
              stroke="rgba(255, 255, 255, 0.1)"
              strokeWidth="0.5"
              strokeDasharray="5,5"
            />
          ))
        )}
      </svg>
    </div>
  );
};

export default CSSSkillsBackground;