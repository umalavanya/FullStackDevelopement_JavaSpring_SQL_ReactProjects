import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Roadmap from '../components/Roadmap';
import TopicViewer from '../components/TopicViewer';
import { 
  Target, 
  Trophy, 
  TrendingUp, 
  Clock, 
  Award,
  BookOpen,
  ChevronRight,
  Star,
  Zap,
  BarChart3
} from 'lucide-react';

const LearningPath = () => {
  const { user, updateUserProgress } = useAuth();
  
  const [userProgress, setUserProgress] = useState({
    completedTopics: user?.progress?.completedTopics || [1],
    completedExercises: user?.progress?.completedExercises || [],
    totalTimeSpent: user?.progress?.totalTimeSpent || 45,
    streakDays: user?.progress?.streakDays || 1
  });

  const [selectedTopic, setSelectedTopic] = useState(null);
  const [showAchievement, setShowAchievement] = useState(false);
  const [recentAchievement, setRecentAchievement] = useState(null);

  // Update auth context when progress changes
  useEffect(() => {
    if (user) {
      updateUserProgress(userProgress);
    }
  }, [userProgress, user, updateUserProgress]);

  const handleTopicClick = (topic) => {
    // Check if topic is accessible
    const topicId = topic.id;
    const isCompleted = userProgress.completedTopics.includes(topicId);
    const isAccessible = checkTopicAccessibility(topicId);
    
    if (isAccessible || isCompleted) {
      setSelectedTopic(topic);
    } else {
      alert('Complete previous topics to unlock this one!');
    }
  };

  const checkTopicAccessibility = (topicId) => {
    // Topic 1 is always accessible
    if (topicId === 1) return true;
    
    // Topic 2-4 require topic 1
    if (topicId >= 2 && topicId <= 4) {
      return userProgress.completedTopics.includes(1);
    }
    
    // Topic 5+ require topic 4
    if (topicId >= 5) {
      return userProgress.completedTopics.includes(4);
    }
    
    return false;
  };

  const handleCompleteTopic = (topicId) => {
    if (!userProgress.completedTopics.includes(topicId)) {
      const newCompletedTopics = [...userProgress.completedTopics, topicId];
      const newTotalTime = userProgress.totalTimeSpent + 30;
      
      setUserProgress(prev => ({
        ...prev,
        completedTopics: newCompletedTopics,
        totalTimeSpent: newTotalTime
      }));

      // Check for achievements
      checkAchievements(newCompletedTopics.length);
      
      setSelectedTopic(null);
      
      // Show achievement notification if earned
      if (newCompletedTopics.length === 3) {
        setRecentAchievement({
          title: 'Quick Learner!',
          description: 'Completed 3 topics in one day',
          icon: '⚡'
        });
        setShowAchievement(true);
        setTimeout(() => setShowAchievement(false), 3000);
      }
    }
  };

  const checkAchievements = (completedCount) => {
    const achievements = [
      { count: 3, title: 'Quick Learner', desc: 'Complete 3 topics in one day' },
      { count: 5, title: 'Halfway There', desc: 'Complete half of the topics' },
      { count: 9, title: 'SQL Master', desc: 'Complete all topics' }
    ];

    const newAchievement = achievements.find(a => a.count === completedCount);
    if (newAchievement) {
      setRecentAchievement(newAchievement);
      setShowAchievement(true);
      setTimeout(() => setShowAchievement(false), 3000);
    }
  };

  const modules = [
    {
      id: 1,
      title: "SQL Basics",
      description: "Introduction to databases and SQL",
      icon: "📚",
      color: "#3b82f6",
      progress: Math.round((userProgress.completedTopics.filter(id => id <= 4).length / 4) * 100)
    },
    {
      id: 2,
      title: "Filtering & Sorting",
      description: "WHERE, ORDER BY, LIMIT clauses",
      icon: "🔍",
      color: "#8b5cf6",
      progress: userProgress.completedTopics.includes(4) ? 
        Math.round((userProgress.completedTopics.filter(id => id >= 5 && id <= 7).length / 3) * 100) : 0
    },
    {
      id: 3,
      title: "Advanced Queries",
      description: "JOINs, Subqueries, Aggregations",
      icon: "⚡",
      color: "#10b981",
      progress: userProgress.completedTopics.includes(7) ? 
        Math.round((userProgress.completedTopics.filter(id => id >= 8).length / 2) * 100) : 0
    }
  ];

  const stats = [
    {
      label: 'Overall Progress',
      value: `${Math.round((userProgress.completedTopics.length / 9) * 100)}%`,
      icon: TrendingUp,
      color: 'var(--primary-color)',
      description: `${userProgress.completedTopics.length} of 9 topics`
    },
    {
      label: 'Learning Streak',
      value: `${userProgress.streakDays} days`,
      icon: Zap,
      color: 'var(--warning-color)',
      description: 'Current streak'
    },
    {
      label: 'Time Invested',
      value: `${Math.floor(userProgress.totalTimeSpent / 60)}h ${userProgress.totalTimeSpent % 60}m`,
      icon: Clock,
      color: 'var(--accent-color)',
      description: 'Total learning time'
    },
    {
      label: 'Achievements',
      value: `${Math.floor(userProgress.completedTopics.length / 3)}/3`,
      icon: Trophy,
      color: 'var(--success-color)',
      description: 'Milestones reached'
    }
  ];

  const nextTopic = userProgress.completedTopics.length < 9 ? 
    `Topic ${userProgress.completedTopics.length + 1}` : 
    'All topics completed!';

  return (
    <div className="container">
      <div className="page-header">
        <div className="header-content">
          <div>
            <h1>Learning Path</h1>
            <p>Follow the roadmap to master SQL step by step, like a game!</p>
          </div>
          <div className="header-actions">
            <button className="btn btn-secondary">
              <BookOpen size={16} />
              View Guide
            </button>
          </div>
        </div>
      </div>

      {/* Achievement Notification */}
      {showAchievement && recentAchievement && (
        <div className="achievement-notification">
          <div className="achievement-icon">{recentAchievement.icon || '🏆'}</div>
          <div className="achievement-content">
            <h4>🎉 Achievement Unlocked!</h4>
            <p>{recentAchievement.title} - {recentAchievement.description}</p>
          </div>
          <button onClick={() => setShowAchievement(false)} className="close-notification">
            ×
          </button>
        </div>
      )}

      {/* Quick Stats */}
      <div className="stats-grid">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="stat-card">
              <div className="stat-icon-wrapper">
                <Icon size={24} style={{ color: stat.color }} />
              </div>
              <div className="stat-content">
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
                <div className="stat-description">{stat.description}</div>
              </div>
              {index === 0 && (
                <div className="stat-progress">
                  <div className="progress-circle">
                    <svg width="60" height="60" viewBox="0 0 60 60">
                      <circle cx="30" cy="30" r="27" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="4"/>
                      <circle cx="30" cy="30" r="27" fill="none" stroke={stat.color} strokeWidth="4"
                        strokeLinecap="round" strokeDasharray="170"
                        strokeDashoffset={170 - (170 * userProgress.completedTopics.length) / 9}
                        transform="rotate(-90 30 30)"/>
                    </svg>
                    <span className="circle-text">
                      {Math.round((userProgress.completedTopics.length / 9) * 100)}%
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Module Progress */}
      <div className="modules-progress">
        <h3>Module Progress</h3>
        <div className="modules-grid">
          {modules.map((module) => (
            <div key={module.id} className="module-card">
              <div className="module-header">
                <div className="module-icon" style={{ backgroundColor: module.color }}>
                  {module.icon}
                </div>
                <div className="module-info">
                  <h4>{module.title}</h4>
                  <p>{module.description}</p>
                </div>
                <div className="module-progress-text">
                  {module.progress}%
                </div>
              </div>
              <div className="module-progress-bar">
                <div 
                  className="module-progress-fill"
                  style={{ 
                    width: `${module.progress}%`,
                    backgroundColor: module.color
                  }}
                ></div>
              </div>
              <div className="module-status">
                {module.progress === 100 ? (
                  <span className="status-completed">
                    <Award size={14} />
                    Completed
                  </span>
                ) : module.progress > 0 ? (
                  <span className="status-in-progress">
                    In Progress
                  </span>
                ) : (
                  <span className="status-locked">
                    Locked
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Current Focus */}
      <div className="current-focus">
        <div className="focus-header">
          <h3>
            <Target size={20} />
            Current Focus
          </h3>
          <span className="focus-next">Next: {nextTopic}</span>
        </div>
        <div className="focus-content">
          <div className="focus-tip">
            <div className="tip-icon">💡</div>
            <div>
              <h4>Today's Recommendation</h4>
              <p>
                {userProgress.completedTopics.length < 4 ? 
                  'Focus on completing SQL Basics module. Start with SELECT Statement.' :
                  userProgress.completedTopics.length < 7 ?
                  'Move on to Filtering & Sorting. Practice WHERE clauses.' :
                  'Tackle Advanced Queries. Learn about JOIN operations.'
                }
              </p>
            </div>
          </div>
          <div className="focus-stats">
            <div className="focus-stat">
              <div className="stat-value">{userProgress.completedTopics.length}</div>
              <div className="stat-label">Topics Completed</div>
            </div>
            <div className="focus-stat">
              <div className="stat-value">
                {Math.round((userProgress.completedTopics.length / 9) * 100)}%
              </div>
              <div className="stat-label">Overall Progress</div>
            </div>
            <div className="focus-stat">
              <div className="stat-value">
                {9 - userProgress.completedTopics.length}
              </div>
              <div className="stat-label">Topics Remaining</div>
            </div>
          </div>
        </div>
      </div>

      {/* Roadmap Section */}
      <div className="roadmap-section">
        <div className="section-header">
          <h2>Your Learning Roadmap</h2>
          <p>Complete topics in order to unlock the next ones. Each completed topic brings you closer to SQL mastery!</p>
        </div>
        
        <Roadmap 
          userProgress={userProgress} 
          onTopicClick={handleTopicClick}
        />

        <div className="roadmap-legend">
          <div className="legend-item">
            <div className="legend-dot completed"></div>
            <span>Completed</span>
          </div>
          <div className="legend-item">
            <div className="legend-dot accessible"></div>
            <span>Available</span>
          </div>
          <div className="legend-item">
            <div className="legend-dot locked"></div>
            <span>Locked</span>
          </div>
          <div className="legend-item">
            <div className="legend-dot practice"></div>
            <span>Practice Exercise</span>
          </div>
        </div>
      </div>

      {/* Tips Section */}
      <div className="learning-tips">
        <h3>🎮 Game Progression Tips</h3>
        <div className="tips-grid">
          <div className="tip-card">
            <Star size={20} color="#f59e0b" />
            <h4>Complete in Order</h4>
            <p>Topics unlock sequentially. Complete each one to progress.</p>
          </div>
          <div className="tip-card">
            <Zap size={20} color="#10b981" />
            <h4>Daily Practice</h4>
            <p>Practice daily to maintain your streak and earn bonuses.</p>
          </div>
          <div className="tip-card">
            <Trophy size={20} color="#8b5cf6" />
            <h4>Earn Achievements</h4>
            <p>Complete milestones to unlock special achievements.</p>
          </div>
          <div className="tip-card">
            <BarChart3 size={20} color="#3b82f6" />
            <h4>Track Progress</h4>
            <p>Monitor your progress in the stats section above.</p>
          </div>
        </div>
      </div>

      {/* Topic Viewer Modal */}
      {selectedTopic && (
        <TopicViewer
          topic={selectedTopic}
          onComplete={() => handleCompleteTopic(selectedTopic.id)}
          onClose={() => setSelectedTopic(null)}
        />
      )}
    </div>
  );
};

export default LearningPath;