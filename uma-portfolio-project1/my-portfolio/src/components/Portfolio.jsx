// components/Portfolio.jsx
import React, { useState, useEffect } from 'react'
import './Portfolio.css'
import ParticleBackground from './ParticleBackground'
import ProjectCard from './ProjectCard'
import SkillBar from './SkillBar'

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('home')
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })

  const projects = [
    {
      id: 1,
      title: "Neural Network Visualizer",
      description: "Interactive 3D visualization of neural networks with real-time training simulation",
      tech: ["React", "Three.js", "TensorFlow.js"],
      imageColor: "#ff6b6b",
      liveLink: "#",
      githubLink: "#",
      featured: true
    },
    {
      id: 2,
      title: "Eco-City Simulation",
      description: "Sustainable city planning simulator with dynamic environmental impact analysis",
      tech: ["JavaScript", "D3.js", "Node.js"],
      imageColor: "#4ecdc4",
      liveLink: "#",
      githubLink: "#",
      featured: true
    },
    {
      id: 3,
      title: "Quantum Cryptography Demo",
      description: "Educational tool demonstrating quantum key distribution principles",
      tech: ["React", "QuantumJS", "WebGL"],
      imageColor: "#9d65c9",
      liveLink: "#",
      githubLink: "#"
    },
    {
      id: 4,
      title: "Astronomy Data Dashboard",
      description: "Real-time visualization of astronomical data from multiple space agencies",
      tech: ["React", "WebSockets", "NASA API"],
      imageColor: "#ffd166",
      liveLink: "#",
      githubLink: "#"
    },
    {
      id: 5,
      title: "Generative Art Engine",
      description: "AI-powered generative art creation tool with custom style transfer",
      tech: ["TensorFlow.js", "P5.js", "React"],
      imageColor: "#06d6a0",
      liveLink: "#",
      githubLink: "#"
    },
    {
      id: 6,
      title: "Bioinformatics Toolkit",
      description: "Web-based suite for DNA sequence analysis and visualization",
      tech: ["Python", "Flask", "React", "BioJS"],
      imageColor: "#118ab2",
      liveLink: "#",
      githubLink: "#"
    }
  ]

  const skills = [
    { name: "React", level: 95, color: "#61dafb" },
    { name: "JavaScript", level: 90, color: "#f7df1e" },
    { name: "Three.js", level: 85, color: "#049ef4" },
    { name: "Node.js", level: 80, color: "#339933" },
    { name: "UI/UX Design", level: 88, color: "#ff6b6b" },
    { name: "Python", level: 75, color: "#3776ab" }
  ]

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'skills', 'contact']
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { top, bottom } = element.getBoundingClientRect()
          const offsetTop = top + window.pageYOffset
          const offsetBottom = bottom + window.pageYOffset

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  return (
    <>
      <ParticleBackground />
      
      {/* Custom Cursor Effect */}
      <div 
        className="custom-cursor" 
        style={{ left: `${cursorPosition.x}px`, top: `${cursorPosition.y}px` }}
      ></div>
      
      {/* Navigation */}
      <nav className="portfolio-nav">
        <div className="nav-logo">
          <span className="logo-text">Uma Lavanya Chintapanti</span>
          <div className="logo-dot"></div>
        </div>
        
        <ul className="nav-links">
          {['Home', 'About', 'Projects', 'Skills', 'Contact'].map((item) => (
            <li key={item}>
              <a 
                href={`#${item.toLowerCase()}`}
                className={activeSection === item.toLowerCase() ? 'active' : ''}
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById(item.toLowerCase()).scrollIntoView({ behavior: 'smooth' })
                }}
              >
                {item}
                <span className="nav-indicator"></span>
              </a>
            </li>
          ))}
        </ul>
        
        <button className="theme-toggle" onClick={toggleDarkMode}>
          <div className={`toggle-circle ${isDarkMode ? 'dark' : 'light'}`}></div>
        </button>
      </nav>
      
      {/* Hero Section */}
      <section id="home" className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              <span className="title-line">Creating</span>
              <span className="title-line">
                <span className="highlight-word">Digital</span>
                <span className="title-sparkle">✨</span>
              </span>
              <span className="title-line">Experiences</span>
            </h1>
            
            <p className="hero-subtitle">
              I build immersive web applications with cutting-edge technologies, 
              beautiful animations, and exceptional user experiences.
            </p>
            
            <div className="hero-buttons">
              <button className="btn-primary" onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}>
                View Projects
                <span className="btn-arrow">→</span>
              </button>
              <button className="btn-secondary" onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}>
                Get In Touch
              </button>
            </div>
          </div>
          
          <div className="hero-visual">
            <div className="floating-shape shape-1"></div>
            <div className="floating-shape shape-2"></div>
            <div className="floating-shape shape-3"></div>
            <div className="code-snippet">
              <pre>{`const developer = {\n  name: "Portfolio Owner",\n  passion: "Creating amazing web experiences",\n  focus: "React, 3D graphics & animations"\n};`}</pre>
            </div>
          </div>
        </div>
        
        <div className="scroll-indicator">
          <div className="scroll-line"></div>
          <span>Scroll to explore</span>
        </div>
      </section>
      
      {/* About Section */}
      <section id="about" className="about-section">
        <div className="section-header">
          <h2 className="section-title">
            <span className="section-number">01</span>
            About Me
          </h2>
          <p className="section-description">
            Passionate developer with a focus on creating exceptional digital experiences
          </p>
        </div>
        
        <div className="about-content">
          <div className="about-text">
            <p>
              I'm a creative developer specializing in building immersive web applications 
              with React, JavaScript, and modern web technologies. My passion lies in 
              combining beautiful design with technical excellence to create memorable 
              digital experiences.
            </p>
            <p>
              With a background in both design and development, I approach each project 
              with a holistic perspective, ensuring that every aspect — from the user 
              interface to the underlying code — is crafted with precision and care.
            </p>
            
            <div className="about-stats">
              <div className="stat">
                <div className="stat-number">50+</div>
                <div className="stat-label">Projects Completed</div>
              </div>
              <div className="stat">
                <div className="stat-number">5+</div>
                <div className="stat-label">Years Experience</div>
              </div>
              <div className="stat">
                <div className="stat-number">100%</div>
                <div className="stat-label">Satisfaction</div>
              </div>
            </div>
          </div>
          
          <div className="about-image">
            <div className="image-placeholder">
              <div className="image-glow"></div>
              <div className="image-content">
                <div className="image-dots">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <div key={i} className="dot" style={{ animationDelay: `${i * 0.1}s` }}></div>
                  ))}
                </div>
                <div className="image-text">Focused on creating amazing digital experiences</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Projects Section */}
      <section id="projects" className="projects-section">
        <div className="section-header">
          <h2 className="section-title">
            <span className="section-number">02</span>
            Featured Projects
          </h2>
          <p className="section-description">
            A selection of my recent work showcasing creativity and technical skills
          </p>
        </div>
        
        <div className="projects-grid">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>
      
      {/* Skills Section */}
      <section id="skills" className="skills-section">
        <div className="section-header">
          <h2 className="section-title">
            <span className="section-number">03</span>
            Skills & Technologies
          </h2>
          <p className="section-description">
            Technologies I work with and my proficiency level
          </p>
        </div>
        
        <div className="skills-container">
          <div className="skills-bars">
            {skills.map((skill, index) => (
              <SkillBar key={index} skill={skill} index={index} />
            ))}
          </div>
          
          <div className="skills-visual">
            <div className="tech-orbit">
              {skills.map((skill, index) => (
                <div 
                  key={index} 
                  className="orbit-item"
                  style={{ 
                    '--angle': `${index * (360 / skills.length)}deg`,
                    '--color': skill.color
                  }}
                >
                  <div className="orbit-dot" style={{ backgroundColor: skill.color }}></div>
                  <span className="orbit-label">{skill.name}</span>
                </div>
              ))}
              <div className="orbit-center"></div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <div className="section-header">
          <h2 className="section-title">
            <span className="section-number">04</span>
            Get In Touch
          </h2>
          <p className="section-description">
            Interested in working together? Let's create something amazing!
          </p>
        </div>
        
        <div className="contact-content">
          <div className="contact-form">
            <form>
              <div className="form-group">
                <input type="text" placeholder="Your Name" className="form-input" />
                <div className="input-underline"></div>
              </div>
              
              <div className="form-group">
                <input type="email" placeholder="Your Email" className="form-input" />
                <div className="input-underline"></div>
              </div>
              
              <div className="form-group">
                <textarea placeholder="Your Message" rows="5" className="form-input"></textarea>
                <div className="input-underline"></div>
              </div>
              
              <button type="submit" className="btn-primary">
                Send Message
                <span className="btn-arrow">→</span>
              </button>
            </form>
          </div>
          
          <div className="contact-info">
            <div className="info-card">
              <div className="info-icon">📧</div>
              <h3>Email</h3>
              <p>hello@portfolio.dev</p>
            </div>
            
            <div className="info-card">
              <div className="info-icon">📍</div>
              <h3>Location</h3>
              <p>Digital Nomad</p>
            </div>
            
            <div className="info-card">
              <div className="info-icon">💼</div>
              <h3>Available For</h3>
              <p>Freelance & Full-time</p>
            </div>
          </div>
        </div>
        
        <footer className="portfolio-footer">
          <div className="footer-content">
            <div className="footer-logo">
              <span className="logo-text">DEV</span>
              <div className="logo-dot"></div>
            </div>
            
            <p className="footer-text">
              Crafted with passion and attention to detail
            </p>
            
            <div className="social-links">
              {['GitHub', 'LinkedIn', 'Twitter', 'CodePen'].map((platform) => (
                <a key={platform} href="#" className="social-link">
                  {platform}
                </a>
              ))}
            </div>
            
            <p className="copyright">© {new Date().getFullYear()} All rights reserved</p>
          </div>
        </footer>
      </section>
    </>
  )
}

export default Portfolio