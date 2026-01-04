import React from 'react';
import SkillBar from './SkillBar'; // Import the SkillBar component
import SkillsBackground from './SkillsBackground'; // Import the background

const Skills = () => {
  const skills = [
    { name: 'Java & Spring Boot', level: 90, color: '#007396' },
    { name: 'React & JavaScript', level: 88, color: '#61DAFB' },
    { name: 'SQL & SSMS', level: 85, color: '#4479A1' },
    { name: 'HTML/CSS', level: 95, color: '#E34F26' },
    { name: 'Spring Framework', level: 87, color: '#6DB33F' },
    { name: 'MySQL', level: 83, color: '#4479A1' },
    { name: 'JavaScript ES6+', level: 90, color: '#F7DF1E' },
    { name: 'Data Structures', level: 88, color: '#4FC08D' },
    { name: 'Algorithms', level: 85, color: '#9B59B6' },
    { name: 'REST APIs', level: 89, color: '#FF6B6B' },
  ];

  return (
    <section id="skills" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <div className="container">
        <h2 className="section-title">Technical Skills</h2>
        <div className="skills-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
          marginTop: '2rem'
        }}>
          {skills.map((skill, index) => (
            <SkillBar 
              key={skill.name} 
              skill={skill} 
              index={index} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;