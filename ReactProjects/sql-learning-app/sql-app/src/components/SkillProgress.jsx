import { TrendingUp, Target, Award } from 'lucide-react';

const SkillProgress = ({ skills }) => {
  const getLevelColor = (level) => {
    switch(level) {
      case 0: return 'var(--text-secondary)';
      case 1: return 'var(--success-color)';
      case 2: return 'var(--primary-color)';
      case 3: return 'var(--accent-color)';
      default: return 'var(--text-secondary)';
    }
  };

  const getLevelLabel = (level) => {
    switch(level) {
      case 0: return 'Not Started';
      case 1: return 'Beginner';
      case 2: return 'Intermediate';
      case 3: return 'Advanced';
      default: return 'Not Started';
    }
  };

  return (
    <div className="skill-progress">
      <div className="skill-progress-header">
        <h4>
          <Target size={20} />
          Skill Progress
        </h4>
      </div>
      <div className="skills-list">
        {skills.map((skill, index) => (
          <div key={index} className="skill-item">
            <div className="skill-info">
              <div className="skill-name">{skill.skill}</div>
              <div 
                className="skill-level"
                style={{ color: getLevelColor(skill.level) }}
              >
                {getLevelLabel(skill.level)}
                {skill.level > 0 && (
                  <Award size={14} style={{ marginLeft: '4px' }} />
                )}
              </div>
            </div>
            <div className="skill-progress-bar">
              <div 
                className="skill-progress-fill"
                style={{ 
                  width: `${skill.progress}%`,
                  backgroundColor: getLevelColor(skill.level)
                }}
              ></div>
            </div>
            <div className="skill-percentage">{skill.progress}%</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillProgress;