// components/SkillBar.jsx
import React, { useEffect, useRef, useState } from 'react'
import './SkillBar.css'

const SkillBar = ({ skill, index }) => {
  const [animatedWidth, setAnimatedWidth] = useState(0)
  const skillBarRef = useRef(null)
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Start animation after a delay based on index
            setTimeout(() => {
              setAnimatedWidth(skill.level)
            }, index * 150)
          }
        })
      },
      { threshold: 0.5 }
    )
    
    if (skillBarRef.current) {
      observer.observe(skillBarRef.current)
    }
    
    return () => {
      if (skillBarRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(skillBarRef.current)
      }
    }
  }, [skill.level, index])
  
  return (
    <div className="skill-bar-container" ref={skillBarRef}>
      <div className="skill-info">
        <span className="skill-name">{skill.name}</span>
        <span className="skill-percentage">{animatedWidth}%</span>
      </div>
      
      <div className="skill-bar-background">
        <div 
          className="skill-bar-fill" 
          style={{ 
            width: `${animatedWidth}%`,
            backgroundColor: skill.color
          }}
        >
          <div className="skill-bar-glow"></div>
        </div>
      </div>
    </div>
  )
}

export default SkillBar ;