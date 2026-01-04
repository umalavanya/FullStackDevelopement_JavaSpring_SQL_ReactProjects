import React, { useEffect, useRef } from 'react';

const GlowingSpheres = ({ theme = 'light' }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const spheres = [];
    const colors = [
      '#FF006E', '#FFBE0B', '#FB5607', '#8338EC', '#3A86FF',
      '#00CECB', '#FFD166', '#EF476F', '#9B5DE5', '#00F5D4'
    ];

    // Create spheres
    for (let i = 0; i < 25; i++) {
      const sphere = document.createElement('div');
      const size = Math.random() * 100 + 50;
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      sphere.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: radial-gradient(circle at 30% 30%, ${color}, transparent 70%);
        border-radius: 50%;
        filter: blur(${size / 5}px);
        opacity: ${Math.random() * 0.3 + 0.1};
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        transform: translateZ(${Math.random() * 100 - 50}px);
        animation: float3d ${Math.random() * 30 + 20}s infinite ease-in-out;
        animation-delay: ${Math.random() * 5}s;
        z-index: 0;
        pointer-events: none;
      `;
      
      container.appendChild(sphere);
      spheres.push({
        element: sphere,
        speed: Math.random() * 0.5 + 0.2,
        amplitude: Math.random() * 50 + 25,
        angle: Math.random() * Math.PI * 2
      });
    }

    // Add CSS animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes float3d {
        0%, 100% {
          transform: translate3d(0, 0, 0) rotate(0deg);
        }
        25% {
          transform: translate3d(50px, -30px, 20px) rotate(90deg);
        }
        50% {
          transform: translate3d(-30px, 40px, -20px) rotate(180deg);
        }
        75% {
          transform: translate3d(40px, 20px, 30px) rotate(270deg);
        }
      }
      
      @keyframes pulseGlow {
        0%, 100% {
          filter: blur(20px) brightness(1);
          opacity: 0.2;
        }
        50% {
          filter: blur(15px) brightness(1.5);
          opacity: 0.4;
        }
      }
    `;
    document.head.appendChild(style);

    // Interactive mouse effect
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      
      spheres.forEach((sphere) => {
        sphere.element.style.transform = `
          translate3d(
            ${Math.sin(sphere.angle + Date.now() * 0.001 * sphere.speed) * sphere.amplitude + x * 20}px,
            ${Math.cos(sphere.angle + Date.now() * 0.001 * sphere.speed) * sphere.amplitude + y * 20}px,
            0
          )
        `;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.head.removeChild(style);
      spheres.forEach(sphere => {
        if (sphere.element.parentNode) {
          sphere.element.parentNode.removeChild(sphere.element);
        }
      });
    };
  }, [theme]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
};

export default GlowingSpheres;