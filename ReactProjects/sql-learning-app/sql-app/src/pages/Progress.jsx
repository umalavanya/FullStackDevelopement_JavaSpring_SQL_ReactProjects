import { useState, useEffect } from 'react';
import { TrendingUp, Target, Award, Clock, Calendar, Zap, BarChart3 } from 'lucide-react';
import ProgressChart from '../components/ProgressChart';
import SkillProgress from '../components/SkillProgress';
import AchievementsGrid from '../components/AchievementsGrid';
import ActivityFeed from '../components/ActivityFeed';
import { progressData, calculateStats } from '../data/progressData';

const Progress = () => {
  const [userProgress, setUserProgress] = useState({
    completedTopics: [1],
    completedChallenges: [],
  });

  const [stats, setStats] = useState(progressData.userStats);

  useEffect(() => {
    const calculatedStats = calculateStats(userProgress);
    setStats(calculatedStats);
  }, [userProgress]);

  const statCards = [
    {
      title: 'Completion Rate',
      value: `${Math.round((userProgress.completedTopics.length / progressData.userStats.totalTopics) * 100)}%`,
      icon: <TrendingUp size={24} />,
      color: 'var(--primary-color)',
      description: 'Topics completed',
    },
    {
      title: 'Learning Streak',
      value: `${stats.streakDays} days`,
      icon: <Zap size={24} />,
      color: 'var(--warning-color)',
      description: 'Current streak',
    },
    {
      title: 'Time Spent',
      value: `${stats.totalHours}h`,
      icon: <Clock size={24} />,
      color: 'var(--accent-color)',
      description: 'Total learning time',
    },
    {
      title: 'Accuracy',
      value: `${stats.accuracyRate}%`,
      icon: <Target size={24} />,
      color: 'var(--success-color)',
      description: 'Challenge accuracy',
    },
  ];

  return (
    <div className="container">
      <div className="page-header">
        <h1>Progress Tracking</h1>
        <p>Monitor your SQL learning journey and achievements</p>
      </div>

      <div className="stats-grid">
        {statCards.map((stat, index) => (
          <div key={index} className="stat-card-large">
            <div className="stat-card-header">
              <div 
                className="stat-icon"
                style={{ backgroundColor: `${stat.color}20`, color: stat.color }}
              >
                {stat.icon}
              </div>
              <span className="stat-title">{stat.title}</span>
            </div>
            <div className="stat-value-large">{stat.value}</div>
            <div className="stat-description">{stat.description}</div>
            <div 
              className="stat-progress-bar"
              style={{ 
                backgroundColor: `${stat.color}20`,
                '--progress-color': stat.color
              }}
            >
              <div 
                className="stat-progress-fill"
                style={{ width: stat.value }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      <div className="progress-layout">
        <div className="progress-main">
          <div className="progress-section">
            <div className="section-header">
              <h3>
                <Calendar size={20} />
                Weekly Activity
              </h3>
            </div>
            <ProgressChart 
              data={progressData.weeklyActivity}
              title="Weekly Learning Activity"
            />
          </div>

          <div className="progress-section">
            <div className="section-header">
              <h3>
                <BarChart3 size={20} />
                Learning Progress
              </h3>
            </div>
            <div className="progress-details">
              <div className="progress-item">
                <div className="progress-label">Topics</div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill"
                    style={{ 
                      width: `${(userProgress.completedTopics.length / progressData.userStats.totalTopics) * 100}%` 
                    }}
                  ></div>
                </div>
                <div className="progress-value">
                  {userProgress.completedTopics.length}/{progressData.userStats.totalTopics}
                </div>
              </div>
              
              <div className="progress-item">
                <div className="progress-label">Challenges</div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill"
                    style={{ 
                      width: `${(userProgress.completedChallenges.length / progressData.userStats.totalChallenges) * 100}%` 
                    }}
                  ></div>
                </div>
                <div className="progress-value">
                  {userProgress.completedChallenges.length}/{progressData.userStats.totalChallenges}
                </div>
              </div>
              
              <div className="progress-item">
                <div className="progress-label">Skills Mastered</div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill"
                    style={{ 
                      width: `${(progressData.skillProgress.filter(s => s.level > 1).length / progressData.skillProgress.length) * 100}%` 
                    }}
                  ></div>
                </div>
                <div className="progress-value">
                  {progressData.skillProgress.filter(s => s.level > 1).length}/{progressData.skillProgress.length}
                </div>
              </div>
            </div>
          </div>

          <div className="progress-section">
            <SkillProgress skills={progressData.skillProgress} />
          </div>
        </div>

        <div className="progress-sidebar">
          <div className="sidebar-section">
            <AchievementsGrid achievements={progressData.achievements} />
          </div>
          
          <div className="sidebar-section">
            <ActivityFeed activities={progressData.recentActivity} />
          </div>

          <div className="sidebar-section">
            <div className="insights-card">
              <h4>📈 Learning Insights</h4>
              <div className="insights-content">
                <div className="insight-item">
                  <div className="insight-text">Your best learning time is in the morning</div>
                </div>
                <div className="insight-item">
                  <div className="insight-text">You complete challenges 25% faster than average</div>
                </div>
                <div className="insight-item">
                  <div className="insight-text">Try practicing daily to maintain your streak!</div>
                </div>
              </div>
              <button className="btn btn-primary btn-block">
                View Detailed Insights
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Progress;