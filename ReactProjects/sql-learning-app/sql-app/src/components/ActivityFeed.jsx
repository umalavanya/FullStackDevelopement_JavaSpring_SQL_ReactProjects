import { BookOpen, Code, Target, Clock } from 'lucide-react';

const ActivityFeed = ({ activities }) => {
  const getActivityIcon = (type) => {
    switch(type) {
      case 'topic': return <BookOpen size={16} />;
      case 'practice': return <Code size={16} />;
      case 'challenge': return <Target size={16} />;
      default: return <BookOpen size={16} />;
    }
  };

  const getActivityColor = (type) => {
    switch(type) {
      case 'topic': return 'var(--primary-color)';
      case 'practice': return 'var(--accent-color)';
      case 'challenge': return 'var(--success-color)';
      default: return 'var(--text-secondary)';
    }
  };

  return (
    <div className="activity-feed">
      <div className="activity-header">
        <h4>Recent Activity</h4>
        <Clock size={18} />
      </div>
      <div className="activities-list">
        {activities.map((activity, index) => (
          <div key={index} className="activity-item">
            <div 
              className="activity-icon"
              style={{ backgroundColor: `${getActivityColor(activity.type)}20` }}
            >
              {getActivityIcon(activity.type)}
            </div>
            <div className="activity-content">
              <div className="activity-title">
                <span className="activity-action">{activity.action}</span>
                <span className="activity-name">{activity.title}</span>
              </div>
              <div className="activity-time">{activity.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityFeed;