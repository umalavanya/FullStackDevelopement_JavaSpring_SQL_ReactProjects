import React, { useEffect, useRef } from 'react';
import './FloatingDots.css';

class Dot {
  constructor(canvas, theme) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.theme = theme;
    
    // Random position
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    
    // Random velocity
    this.vx = (Math.random() - 0.5) * 0.8;
    this.vy = (Math.random() - 0.5) * 0.8;
    
    // Random size
    this.radius = Math.random() * 3 + 1;
    
    // Colors based on theme - BRIGHT and VIBRANT
    this.lightColors = [
      '#FF6B6B', '#4ECDC4', '#FFD166', '#06D6A0', '#118AB2', // Bright colors
      '#EF476F', '#FF9E6D', '#9B5DE5', '#00BBF9', '#00F5D4'  // More brights
    ];
    this.darkColors = [
      '#FF6B6B', '#4ECDC4', '#FFD166', '#06D6A0', '#118AB2', // Same bright colors
      '#EF476F', '#FF9E6D', '#9B5DE5', '#00BBF9', '#00F5D4'  // for contrast
    ];
    
    this.colors = theme === 'dark' ? this.darkColors : this.lightColors;
    this.color = this.colors[Math.floor(Math.random() * this.colors.length)];
    
    // Glow effect
    this.glowIntensity = Math.random() * 0.5 + 0.5;
    this.glowRadius = this.radius * 3;
    
    // Floating animation
    this.floatOffset = Math.random() * Math.PI * 2;
    this.floatSpeed = Math.random() * 0.05 + 0.02;
    this.floatAmplitude = Math.random() * 1.5 + 0.5;
  }
  
  update() {
    // Apply velocity
    this.x += this.vx;
    this.y += this.vy;
    
    // Add floating motion
    const floatY = Math.sin(Date.now() * 0.001 * this.floatSpeed + this.floatOffset) * this.floatAmplitude;
    this.y += floatY;
    
    // Bounce off walls with some randomness
    if (this.x <= 0 || this.x >= this.canvas.width) {
      this.vx = -this.vx * (0.9 + Math.random() * 0.2);
    }
    if (this.y <= 0 || this.y >= this.canvas.height) {
      this.vy = -this.vy * (0.9 + Math.random() * 0.2);
    }
    
    // Keep within bounds
    this.x = Math.max(this.radius, Math.min(this.canvas.width - this.radius, this.x));
    this.y = Math.max(this.radius, Math.min(this.canvas.height - this.radius, this.y));
  }
  
  draw() {
    // Draw glow
    const gradient = this.ctx.createRadialGradient(
      this.x, this.y, this.radius,
      this.x, this.y, this.glowRadius
    );
    gradient.addColorStop(0, this.color);
    gradient.addColorStop(1, 'transparent');
    
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.glowRadius, 0, Math.PI * 2);
    this.ctx.fillStyle = gradient;
    this.ctx.fill();
    
    // Draw dot
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
    
    // Add inner highlight
    this.ctx.beginPath();
    this.ctx.arc(
      this.x - this.radius * 0.3,
      this.y - this.radius * 0.3,
      this.radius * 0.3,
      0,
      Math.PI * 2
    );
    this.ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    this.ctx.fill();
  }
  
  distanceTo(other) {
    const dx = this.x - other.x;
    const dy = this.y - other.y;
    return Math.sqrt(dx * dx + dy * dy);
  }
}

const FloatingDots = ({ theme = 'light' }) => {
  const canvasRef = useRef(null);
  const dotsRef = useRef([]);
  const animationFrameRef = useRef();
  const mouseRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let dots = [];
    let resizeTimeout;

    const initDots = () => {
      dots = [];
      const dotCount = Math.min(80, Math.floor((canvas.width * canvas.height) / 12000));
      
      for (let i = 0; i < dotCount; i++) {
        dots.push(new Dot(canvas, theme));
      }
    };

    const resizeCanvas = () => {
      if (resizeTimeout) clearTimeout(resizeTimeout);
      
      resizeTimeout = setTimeout(() => {
        const parent = canvas.parentElement;
        if (parent) {
          canvas.width = parent.clientWidth;
          canvas.height = parent.clientHeight;
          initDots();
        }
      }, 100);
    };

    const drawConnections = () => {
      const connectionDistance = 150;
      
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const distance = dots[i].distanceTo(dots[j]);
          
          if (distance < connectionDistance) {
            const opacity = 1 - (distance / connectionDistance);
            
            // Gradient line
            const gradient = ctx.createLinearGradient(
              dots[i].x, dots[i].y,
              dots[j].x, dots[j].y
            );
            gradient.addColorStop(0, `${dots[i].color}${Math.floor(opacity * 30).toString(16).padStart(2, '0')}`);
            gradient.addColorStop(1, `${dots[j].color}${Math.floor(opacity * 30).toString(16).padStart(2, '0')}`);
            
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
        
        // Mouse interaction lines
        const dx = dots[i].x - mouseRef.current.x;
        const dy = dots[i].y - mouseRef.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
          const opacity = 1 - (distance / 150);
          ctx.beginPath();
          ctx.moveTo(dots[i].x, dots[i].y);
          ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
          ctx.strokeStyle = `${dots[i].color}${Math.floor(opacity * 20).toString(16).padStart(2, '0')}`;
          ctx.lineWidth = 0.3;
          ctx.stroke();
          
          // Push dots away from mouse
          const force = (150 - distance) / 150;
          dots[i].vx += (dx / distance) * force * 0.5;
          dots[i].vy += (dy / distance) * force * 0.5;
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw connections first (behind dots)
      drawConnections();
      
      // Update and draw dots
      dots.forEach(dot => {
        dot.update();
        dot.draw();
      });
      
      // Draw mouse effect
      if (mouseRef.current.x > 0 && mouseRef.current.y > 0) {
        const gradient = ctx.createRadialGradient(
          mouseRef.current.x, mouseRef.current.y, 0,
          mouseRef.current.x, mouseRef.current.y, 50
        );
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.1)');
        gradient.addColorStop(1, 'transparent');
        
        ctx.beginPath();
        ctx.arc(mouseRef.current.x, mouseRef.current.y, 50, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -100, y: -100 };
    };

    // Initialize
    resizeCanvas();
    animate();

    // Event listeners
    window.addEventListener('resize', resizeCanvas);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      
      if (resizeTimeout) clearTimeout(resizeTimeout);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="floating-dots-canvas"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
    />
  );
};

export default FloatingDots;