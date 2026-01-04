import React, { useEffect, useRef } from 'react';

class Sphere {
  constructor(canvas, skill) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.skill = skill;
    
    // Position based on skill properties
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    
    // Size based on skill level (bigger for higher skills)
    this.baseRadius = (skill.level / 100) * 40 + 20;
    this.radius = this.baseRadius;
    
    // Movement
    this.vx = (Math.random() - 0.5) * 0.3;
    this.vy = (Math.random() - 0.5) * 0.3;
    
    // Colors - Bright and vibrant
    this.glowColors = [
      '#FF006E', '#FFBE0B', '#3A86FF', '#8338EC', '#00F5D4',
      '#FB5607', '#00CECB', '#FF5E5B', '#9B5DE5', '#118AB2'
    ];
    this.color = this.glowColors[Math.floor(Math.random() * this.glowColors.length)];
    
    // Glow properties
    this.glowIntensity = skill.level / 100;
    this.glowRadius = this.radius * 3;
    
    // Animation
    this.pulseSpeed = Math.random() * 0.01 + 0.005;
    this.pulseOffset = Math.random() * Math.PI * 2;
    
    // Connection lines
    this.connections = [];
  }
  
  update(time) {
    // Move sphere
    this.x += this.vx;
    this.y += this.vy;
    
    // Bounce off walls
    if (this.x < this.radius || this.x > this.canvas.width - this.radius) {
      this.vx = -this.vx;
    }
    if (this.y < this.radius || this.y > this.canvas.height - this.radius) {
      this.vy = -this.vy;
    }
    
    // Pulsing animation
    this.radius = this.baseRadius + Math.sin(time * this.pulseSpeed + this.pulseOffset) * 5;
    
    // Keep within bounds
    this.x = Math.max(this.radius, Math.min(this.canvas.width - this.radius, this.x));
    this.y = Math.max(this.radius, Math.min(this.canvas.height - this.radius, this.y));
  }
  
  draw() {
    const ctx = this.ctx;
    
    // Draw outer glow (multiple layers for intensity)
    for (let i = 3; i > 0; i--) {
      const radius = this.glowRadius * (i / 3);
      const opacity = 0.1 * (this.glowIntensity / i);
      
      const gradient = ctx.createRadialGradient(
        this.x, this.y, 0,
        this.x, this.y, radius
      );
      gradient.addColorStop(0, `${this.color}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`);
      gradient.addColorStop(1, 'transparent');
      
      ctx.beginPath();
      ctx.arc(this.x, this.y, radius, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
    }
    
    // Draw main sphere with gradient
    const sphereGradient = ctx.createRadialGradient(
      this.x - this.radius * 0.3,
      this.y - this.radius * 0.3,
      0,
      this.x, this.y, this.radius
    );
    sphereGradient.addColorStop(0, this.color);
    sphereGradient.addColorStop(0.7, `${this.color}CC`);
    sphereGradient.addColorStop(1, `${this.color}66`);
    
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = sphereGradient;
    ctx.fill();
    
    // Draw inner highlight
    const highlightGradient = ctx.createRadialGradient(
      this.x - this.radius * 0.2,
      this.y - this.radius * 0.2,
      0,
      this.x - this.radius * 0.2,
      this.y - this.radius * 0.2,
      this.radius * 0.5
    );
    highlightGradient.addColorStop(0, 'rgba(255, 255, 255, 0.4)');
    highlightGradient.addColorStop(1, 'transparent');
    
    ctx.beginPath();
    ctx.arc(
      this.x - this.radius * 0.2,
      this.y - this.radius * 0.2,
      this.radius * 0.5,
      0,
      Math.PI * 2
    );
    ctx.fillStyle = highlightGradient;
    ctx.fill();
  }
  
  drawConnection(toSphere) {
    const ctx = this.ctx;
    const dx = this.x - toSphere.x;
    const dy = this.y - toSphere.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance < 200) {
      // Create gradient line between spheres
      const gradient = ctx.createLinearGradient(
        this.x, this.y,
        toSphere.x, toSphere.y
      );
      gradient.addColorStop(0, `${this.color}33`);
      gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.2)');
      gradient.addColorStop(1, `${toSphere.color}33`);
      
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(toSphere.x, toSphere.y);
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 0.8;
      ctx.stroke();
      
      // Add glowing dots along the line
      const dotCount = Math.floor(distance / 20);
      for (let i = 1; i < dotCount; i++) {
        const t = i / dotCount;
        const dotX = this.x + (toSphere.x - this.x) * t;
        const dotY = this.y + (toSphere.y - this.y) * t;
        
        ctx.beginPath();
        ctx.arc(dotX, dotY, 1, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.3})`;
        ctx.fill();
      }
    }
  }
}

const SkillsBackground = ({ theme, skills = [] }) => {
  const canvasRef = useRef(null);
  const spheresRef = useRef([]);
  const animationFrameRef = useRef();
  const mouseRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let spheres = [];
    let time = 0;

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
        
        // Create spheres based on skills or default
        const sphereSkills = skills.length > 0 ? skills : [
          { level: 90, name: 'Java' },
          { level: 88, name: 'React' },
          { level: 85, name: 'SQL' },
          { level: 95, name: 'HTML/CSS' },
          { level: 87, name: 'Spring' },
          { level: 83, name: 'MySQL' },
          { level: 90, name: 'JavaScript' },
          { level: 88, name: 'Data Structures' },
          { level: 85, name: 'Algorithms' },
          { level: 89, name: 'REST APIs' },
        ];
        
        spheres = sphereSkills.map(skill => new Sphere(canvas, skill));
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw dark overlay for better contrast
      ctx.fillStyle = theme === 'dark' 
        ? 'rgba(15, 15, 35, 0.7)' 
        : 'rgba(245, 247, 250, 0.7)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Update time
      time += 0.016;
      
      // Update and draw connections first
      for (let i = 0; i < spheres.length; i++) {
        for (let j = i + 1; j < spheres.length; j++) {
          spheres[i].drawConnection(spheres[j]);
        }
      }
      
      // Update and draw spheres
      spheres.forEach(sphere => {
        sphere.update(time);
        sphere.draw();
        
        // Mouse interaction
        const dx = sphere.x - mouseRef.current.x;
        const dy = sphere.y - mouseRef.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
          // Push sphere away from mouse
          const force = (150 - distance) / 150;
          sphere.vx += (dx / distance) * force * 0.2;
          sphere.vy += (dy / distance) * force * 0.2;
          
          // Increase glow on hover
          sphere.glowIntensity = Math.min(1, sphere.glowIntensity + 0.1);
        } else {
          // Gradually return to normal glow
          sphere.glowIntensity = sphere.skill.level / 100;
        }
      });
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    // Initialize
    resizeCanvas();
    animate();

    // Event listeners
    window.addEventListener('resize', resizeCanvas);
    canvas.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [theme, skills]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
};

export default SkillsBackground;