import React, { useEffect, useState } from 'react';
import './FloatingDots.css';

const CSSFloatingDots = ({ theme = 'light', dotCount = 50 }) => {
  const [dots, setDots] = useState([]);

  useEffect(() => {
    const createDots = () => {
      const newDots = Array.from({ length: dotCount }, (_, i) => ({
        id: i,
        size: Math.random() * 6 + 2,
        left: Math.random() * 100,
        top: Math.random() * 100,
        blur: Math.random() * 10 + 5,
        duration: Math.random() * 20 + 10,
        delay: Math.random() * 5,
        colorIndex: Math.floor(Math.random() * 10),
      }));
      setDots(newDots);
    };

    createDots();

    const handleResize = () => {
      createDots();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [dotCount, theme]);

  // VIBRANT COLOR PALETTES
  const colorPalettes = {
    light: [
      '#FF006E', '#FFBE0B', '#FB5607', '#8338EC', '#3A86FF', // Bright and vibrant
      '#FF5E5B', '#00CECB', '#FFD166', '#EF476F', '#118AB2',
      '#9B5DE5', '#F15BB5', '#00BBF9', '#00F5D4', '#FF9E00'
    ],
    dark: [
      '#FF006E', '#FFBE0B', '#FB5607', '#8338EC', '#3A86FF', // Same vibrant colors
      '#FF5E5B', '#00CECB', '#FFD166', '#EF476F', '#118AB2',
      '#9B5DE5', '#F15BB5', '#00BBF9', '#00F5D4', '#FF9E00'
    ]
  };

  const colors = colorPalettes[theme];

  return (
    <div className="floating-dots-container">
      {dots.map((dot) => {
        const color = colors[dot.colorIndex];
        
        return (
          <div
            key={dot.id}
            className="floating-dot"
            style={{
              position: 'absolute',
              left: `${dot.left}%`,
              top: `${dot.top}%`,
              width: `${dot.size}px`,
              height: `${dot.size}px`,
              backgroundColor: color,
              borderRadius: '50%',
              filter: `blur(${dot.blur}px)`,
              animation: `
                float ${dot.duration}s ease-in-out infinite,
                pulse ${dot.duration * 0.7}s ease-in-out infinite,
                colorShift ${dot.duration * 3}s linear infinite
              `,
              animationDelay: `${dot.delay}s`,
              opacity: 0.7,
              boxShadow: `
                0 0 ${dot.size * 3}px ${dot.size}px ${color}40,
                0 0 ${dot.size * 5}px ${dot.size * 2}px ${color}20,
                0 0 ${dot.size * 8}px ${dot.size * 3}px ${color}10
              `,
              zIndex: 0,
              pointerEvents: 'none',
            }}
          />
        );
      })}
    </div>
  );
};

export default CSSFloatingDots;