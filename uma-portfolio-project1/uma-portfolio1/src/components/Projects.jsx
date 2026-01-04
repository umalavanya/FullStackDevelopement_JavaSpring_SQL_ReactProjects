import React from 'react';

const Projects = () => {
  const projects = [
    {
      title: 'Full-Stack E-Commerce Platform',
      description: 'Complete e-commerce solution with user authentication, product catalog, shopping cart, payment integration, and admin dashboard. Features include JWT authentication, role-based access, and real-time inventory management.',
      tech: ['Java', 'Spring Boot', 'React', 'MySQL', 'REST APIs'],
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600',
      github: '#',
      live: '#'
    },
    {
      title: 'Task Management System',
      description: 'Real-time collaborative task management application with WebSocket integration, JWT authentication, and advanced filtering capabilities.',
      tech: ['Spring Security', 'React', 'WebSocket', 'JWT', 'SSMS'],
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w-600',
      github: '#',
      live: '#'
    },
    {
      title: 'Inventory Management',
      description: 'Enterprise inventory management system with role-based access control, real-time updates, and comprehensive reporting features.',
      tech: ['Java', 'Spring Data', 'React', 'SQL', 'Chart.js'],
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600',
      github: '#',
      live: '#'
    },
    {
      title: 'Social Media API',
      description: 'RESTful API for social media platform with features like posts, comments, likes, and user following system.',
      tech: ['Spring Boot', 'JPA', 'MySQL', 'OAuth2', 'Redis'],
      image: 'https://images.unsplash.com/photo-1611605698323-b1e99cfd37ea?w=600',
      github: '#',
      live: '#'
    },
    {
      title: 'Algorithm Visualizer',
      description: 'Interactive visualization tool for common algorithms and data structures with step-by-step execution.',
      tech: ['React', 'D3.js', 'JavaScript', 'Algorithms', 'CSS'],
      image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600',
      github: '#',
      live: '#'
    },
    {
      title: 'Banking System',
      description: 'Secure banking application with transaction processing, account management, and financial reporting.',
      tech: ['Java', 'Spring Security', 'React', 'SQL', 'Microservices'],
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600',
      github: '#',
      live: '#'
    }
  ];

  return (
    <section id="projects">
      <div className="container">
        <h2 className="section-title">Featured Projects</h2>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div 
              key={project.title} 
              className="project-card animate-fade-in-up hover-lift"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div style={{ position: 'relative', overflow: 'hidden' }}>
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="project-image"
                />
                <div style={{
                  position: 'absolute',
                  top: '0',
                  left: '0',
                  right: '0',
                  bottom: '0',
                  background: 'linear-gradient(to bottom, transparent 50%, var(--bg-card) 100%)'
                }}></div>
              </div>
              
              <div className="project-content">
                <h3 style={{ 
                  fontSize: '1.5rem', 
                  marginBottom: '1rem',
                  color: 'var(--text-accent)'
                }}>
                  {project.title}
                </h3>
                
                <p style={{ 
                  color: 'var(--text-secondary)',
                  marginBottom: '1.5rem'
                }}>
                  {project.description}
                </p>

                <div className="project-tech">
                  {project.tech.map(tech => (
                    <span key={tech} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>

                

                <div className="project-tech">
                  {project.tech.map(tech => (
                    <span key={tech} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div style={{ 
                  display: 'flex', 
                  gap: '1rem',
                  marginTop: '1.5rem'
                }}>
                  <a 
                    href={project.github} 
                    className="btn btn-primary"
                    style={{ padding: '0.8rem 1.5rem', fontSize: '0.9rem' }}
                  >
                    View Code
                  </a>
                  <a 
                    href={project.live} 
                    className="btn btn-secondary"
                    style={{ padding: '0.8rem 1.5rem', fontSize: '0.9rem' }}
                  >
                    Live Demo
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;