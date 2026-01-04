// src/components/ProjectCard.jsx
import React, { useState } from 'react'
import './ProjectCard.css'

const ProjectCard = ({ project }) => {
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <div 
      className={`project-card ${project.featured ? 'featured' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ '--card-color': project.imageColor }}
    >
      <div className="project-header">
        <div className="project-color" style={{ backgroundColor: project.imageColor }}></div>
        <h3 className="project-title">{project.title}</h3>
      </div>
      
      <div className="project-content">
        <p className="project-description">{project.description}</p>
        
        <div className="project-tech">
          {project.tech.map((tech, index) => (
            <span key={index} className="tech-tag">{tech}</span>
          ))}
        </div>
      </div>
      
      <div className="project-footer">
        <div className="project-links">
          <a href={project.liveLink} className="project-link">
            Live Demo
            <span className="link-icon">↗</span>
          </a>
          <a href={project.githubLink} className="project-link">
            GitHub
            <span className="link-icon">↗</span>
          </a>
        </div>
        
        <div className={`project-hover-effect ${isHovered ? 'active' : ''}`}>
          <div className="hover-circle" style={{ animationDelay: '0s' }}></div>
          <div className="hover-circle" style={{ animationDelay: '0.2s' }}></div>
          <div className="hover-circle" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
      
      {project.featured && (
        <div className="featured-badge">
          <span>Featured</span>
        </div>
      )}
    </div>
  )
}

export default ProjectCard