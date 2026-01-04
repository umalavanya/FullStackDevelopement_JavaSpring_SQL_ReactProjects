import React from 'react';
import { FaJava, FaReact, FaDatabase, FaCode } from 'react-icons/fa';
import { SiSpringboot, SiMysql, SiJavascript } from 'react-icons/si';

const Skills = () => {
  const skills = [
    { name: 'Java & Spring Boot', level: 90, icon: <FaJava />, color: '#007396' },
    { name: 'React & JavaScript', level: 88, icon: <FaReact />, color: '#61DAFB' },
    { name: 'SQL & SSMS', level: 85, icon: <FaDatabase />, color: '#4479A1' },
    { name: 'HTML/CSS', level: 95, icon: <FaCode />, color: '#E34F26' },
    { name: 'Spring Framework', level: 87, icon: <SiSpringboot />, color: '#6DB33F' },
    { name: 'MySQL', level: 83, icon: <SiMysql />, color: '#4479A1' },
    { name: 'JavaScript ES6+', level: 90, icon: <SiJavascript />, color: '#F7DF1E' },
    { name: 'Data Structures', level: 88, icon: <FaCode />, color: '#4FC08D' },
    { name: 'Algorithms', level: 85, icon: <FaCode />, color: '#9B59B6' },
    { name: 'REST APIs', level: 89, icon: <FaCode />, color: '#FF6B6B' },
  ];

  return (
    <section id="skills" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <div className="container">
        <h2 className="section-title">Technical Skills</h2>
        <div className="skills-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem'
        }}>
          {skills.map((skill, index) => (
            <div 
              key={skill.name} 
              className="skill-item animate-fade-in-up hover-lift"
              style={{ 
                animationDelay: `${index * 0.1}s`,
                padding: '1.5rem',
                borderRadius: '10px',
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-color)'
              }}
            >
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '1rem',
                marginBottom: '1rem'
              }}>
                <div style={{ 
                  fontSize: '2rem',
                  color: skill.color 
                }}>
                  {skill.icon}
                </div>
                <div className="skill-name">
                  <span>{skill.name}</span>
                  <span>{skill.level}%</span>
                </div>
              </div>
              <div className="skill-bar">
                <div 
                  className="skill-progress"
                  style={{
                    width: `${skill.level}%`,
                    backgroundColor: skill.color,
                    '--progress-width': `${skill.level}%`
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;