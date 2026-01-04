import React, { useEffect, useRef, useState } from 'react'
import './SkillBar.css'

// Import React Icons (if you have them installed)
// import { FaJava, FaReact, FaDatabase, FaCode } from 'react-icons/fa'

const SkillBar = ({ skill, index }) => {
  const [animatedWidth, setAnimatedWidth] = useState(0)
  const skillBarRef = useRef(null)
  
  // Icon mapping for skills
  const getSkillIcon = (skillName) => {
    const iconMap = {
      'Java': '☕',
      'React': '⚛️',
      'SQL': '🗄️',
      'HTML/CSS': '🎨',
      'Spring': '🌱',
      'MySQL': '🐬',
      'JavaScript': '📜',
      'Data Structures': '📊',
      'Algorithms': '⚡',
      'REST APIs': '🔗',
    };
    
    for (const [key, icon] of Object.entries(iconMap)) {
      if (skillName.includes(key)) {
        return icon;
      }
    }
    return '💻'; // Default icon
  };
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setAnimatedWidth(skill.level)
            }, index * 150)
          }
        })
      },
      { threshold: 0.3 } // Reduced threshold for earlier animation
    )
    
    if (skillBarRef.current) {
      observer.observe(skillBarRef.current)
    }
    
    return () => {
      if (skillBarRef.current) {
        observer.unobserve(skillBarRef.current)
      }
    }
  }, [skill.level, index])
  
  return (
    <div className="skill-bar-container" ref={skillBarRef} style={{ '--index': index }}>
      <div className="skill-info">
        <div className="skill-title">
          <span className="skill-icon">{getSkillIcon(skill.name)}</span>
          <span className="skill-name">{skill.name}</span>
        </div>
        <span className="skill-percentage">{Math.round(animatedWidth)}%</span>
      </div>
      
      <div className="skill-bar-background">
        <div 
          className="skill-bar-fill" 
          style={{ 
            width: `${animatedWidth}%`,
            '--color': skill.color
          }}
        >
          <div className="skill-bar-glow"></div>
        </div>
      </div>
      
      {/* Tooltip on hover */}
      <div className="skill-tooltip">
        {skill.level >= 90 ? 'Expert' : 
         skill.level >= 75 ? 'Advanced' : 
         skill.level >= 60 ? 'Intermediate' : 'Beginner'}
      </div>
    </div>
  )
}

export default SkillBar;