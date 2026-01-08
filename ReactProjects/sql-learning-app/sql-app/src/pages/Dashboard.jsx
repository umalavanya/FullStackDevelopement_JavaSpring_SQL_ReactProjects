import { Link } from 'react-router-dom';
import { TrendingUp, Target, Clock, Award, ArrowRight, Calendar } from 'lucide-react';
import { progressData } from '../data/progressData';

const Dashboard = () => {
  const userProgress = {
    completedTopics: 1,
    totalTopics: 9,
    streakDays: 1,
    nextTopics: ['SELECT Statement', 'WHERE Clause']
  };

  const quickStats = [
    { label: 'Completion Rate', value: '11%', icon: TrendingUp, color: 'var(--primary-color)' },
    { label: 'Learning Streak', value: '1 day', icon: Target, color: 'var(--warning-color)' },
    { label: 'Time Spent', value: '1h', icon: Clock, color: 'var(--accent-color)' },
    { label: 'Achievements', value: '1/6', icon: Award, color: 'var(--success-color)' },
  ];

  return (
    <div className="container">
      <div className="page-header">
        <h1>Welcome back! 👋</h1>
        <p>Continue your SQL learning journey</p>
      </div>

      <div className="dashboard-content">
        <div className="dashboard-grid">
          {quickStats.map((stat, index) => (
            <div key={index} className="dashboard-card">
              <div className="card-header">
                <div 
                  className="card-icon"
                  style={{ backgroundColor: `${stat.color}20`, color: stat.color }}
                >
                  <stat.icon size={24} />
                </div>
                <h3>{stat.label}</h3>
              </div>
              <div className="card-value">{stat.value}</div>
              <div className="card-progress">
                <div 
                  className="card-progress-bar"
                  style={{ 
                    backgroundColor: `${stat.color}20`,
                    '--progress-color': stat.color
                  }}
                >
                  <div 
                    className="card-progress-fill"
                    style={{ width: stat.value }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="dashboard-sections">
          <div className="dashboard-section">
            <div className="section-header">
              <h3>
                <Calendar size={20} />
                Continue Learning
              </h3>
              <Link to="/learning-path" className="view-all">
                View all <ArrowRight size={16} />
              </Link>
            </div>
            <div className="continue-learning">
              {userProgress.nextTopics.map((topic, index) => (
                <div key={index} className="learning-item">
                  <div className="learning-checkbox"></div>
                  <div className="learning-content">
                    <h4>{topic}</h4>
                    <p>Next topic in your learning path</p>
                  </div>
                  <Link to="/learning-path" className="btn btn-small">
                    Start
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <div className="dashboard-section">
            <div className="section-header">
              <h3>Recent Activity</h3>
              <Link to="/progress" className="view-all">
                View all <ArrowRight size={16} />
              </Link>
            </div>
            <div className="recent-activity">
              {progressData.recentActivity.slice(0, 3).map((activity, index) => (
                <div key={index} className="activity-item-small">
                  <div className="activity-type">{activity.type}</div>
                  <div className="activity-details">
                    <div className="activity-title">{activity.title}</div>
                    <div className="activity-time">{activity.time}</div>
                  </div>
                  <div className={`activity-status ${activity.action}`}>
                    {activity.action}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="motivation-card">
          <div className="motivation-content">
            <h3>🚀 Keep Going!</h3>
            <p>You've completed {userProgress.completedTopics} of {userProgress.totalTopics} topics. 
            Complete 3 more topics to unlock the next module!</p>
          </div>
          <div className="motivation-progress">
            <div className="progress-circle">
              <svg width="80" height="80" viewBox="0 0 80 80">
                <circle cx="40" cy="40" r="35" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="6"/>
                <circle cx="40" cy="40" r="35" fill="none" stroke="var(--primary-color)" strokeWidth="6"
                  strokeLinecap="round" strokeDasharray="220"
                  strokeDashoffset={220 - (220 * userProgress.completedTopics) / userProgress.totalTopics}
                  transform="rotate(-90 40 40)"/>
              </svg>
              <div className="progress-text">
                {Math.round((userProgress.completedTopics / userProgress.totalTopics) * 100)}%
              </div>
            </div>
            <Link to="/learning-path" className="btn btn-primary">
              Continue Learning
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;