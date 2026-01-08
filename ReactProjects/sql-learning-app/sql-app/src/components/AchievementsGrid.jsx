import { Trophy, Lock, CheckCircle } from 'lucide-react';

const AchievementsGrid = ({ achievements }) => {
  return (
    <div className="achievements-grid">
      <div className="achievements-header">
        <h4>
          <Trophy size={20} />
          Achievements
        </h4>
        <span className="achievements-count">
          {achievements.filter(a => a.earned).length}/{achievements.length} earned
        </span>
      </div>
      <div className="achievements-list">
        {achievements.map((achievement) => (
          <div 
            key={achievement.id} 
            className={`achievement-card ${achievement.earned ? 'earned' : 'locked'}`}
            title={achievement.earned ? `Earned on ${new Date(achievement.date).toLocaleDateString()}` : 'Locked'}
          >
            <div className="achievement-icon">
              {achievement.earned ? achievement.icon : '🔒'}
            </div>
            <div className="achievement-info">
              <div className="achievement-name">{achievement.name}</div>
              <div className="achievement-description">{achievement.description}</div>
            </div>
            <div className="achievement-status">
              {achievement.earned ? (
                <CheckCircle size={16} color="var(--success-color)" />
              ) : (
                <Lock size={16} color="var(--text-secondary)" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AchievementsGrid;