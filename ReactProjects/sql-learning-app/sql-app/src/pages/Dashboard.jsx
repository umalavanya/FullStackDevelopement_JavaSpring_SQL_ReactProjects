import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  TrendingUp, 
  Target, 
  Clock, 
  Award, 
  ArrowRight, 
  Calendar, 
  BookOpen, 
  Code, 
  Brain,
  Zap,
  ChevronRight,
  BarChart3,
  Trophy
} from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();

  const userProgress = {
    completedTopics: user?.progress?.completedTopics?.length || 0,
    totalTopics: 9,
    streakDays: user?.progress?.streakDays || 1,
    nextTopics: ['SELECT Statement', 'WHERE Clause', 'ORDER BY'],
    totalTime: user?.progress?.totalTimeSpent || 45,
    accuracy: 78
  };

  const quickStats = [
    { 
      label: 'Completion Rate', 
      value: `${Math.round((userProgress.completedTopics / userProgress.totalTopics) * 100)}%`, 
      icon: TrendingUp, 
      color: 'var(--primary-color)',
      change: '+12%',
      description: 'Topics completed' 
    },
    { 
      label: 'Learning Streak', 
      value: `${userProgress.streakDays} day${userProgress.streakDays !== 1 ? 's' : ''}`, 
      icon: Target, 
      color: 'var(--warning-color)',
      change: '+2',
      description: 'Current streak' 
    },
    { 
      label: 'Time Spent', 
      value: `${Math.floor(userProgress.totalTime / 60)}h ${userProgress.totalTime % 60}m`, 
      icon: Clock, 
      color: 'var(--accent-color)',
      change: '+30m',
      description: 'Total learning time' 
    },
    { 
      label: 'Accuracy', 
      value: `${userProgress.accuracy}%`, 
      icon: Award, 
      color: 'var(--success-color)',
      change: '+5%',
      description: 'Challenge accuracy' 
    },
  ];

  const recentActivity = [
    { type: 'topic', title: 'What is SQL?', action: 'completed', time: '2 hours ago', icon: BookOpen },
    { type: 'practice', title: 'SELECT Statement', action: 'attempted', time: '1 hour ago', icon: Code },
    { type: 'challenge', title: 'Basic Queries', action: 'started', time: '30 minutes ago', icon: Brain },
    { type: 'quiz', title: 'SQL Basics Quiz', action: 'completed', time: '1 day ago', icon: Trophy },
  ];

  const upcomingTopics = [
    { id: 3, title: 'SELECT Statement', module: 'SQL Basics', duration: '25 min', status: 'next' },
    { id: 4, title: 'Basic Queries Practice', module: 'SQL Basics', duration: '30 min', status: 'next' },
    { id: 5, title: 'WHERE Clause', module: 'Filtering & Sorting', duration: '20 min', status: 'locked' },
  ];

  const quickActions = [
    { path: '/practice', icon: Code, label: 'Practice SQL', color: 'var(--primary-color)', description: 'Write and execute SQL queries' },
    { path: '/learning-path', icon: BookOpen, label: 'Continue Learning', color: 'var(--success-color)', description: 'Resume your learning path' },
    { path: '/self-evaluation', icon: Brain, label: 'Take a Quiz', color: 'var(--accent-color)', description: 'Test your knowledge' },
    { path: '/progress', icon: BarChart3, label: 'View Progress', color: 'var(--warning-color)', description: 'See your analytics' },
  ];

  return (
    <div className="container">
      <div className="page-header">
        <h1>Welcome back, {user?.name || 'Learner'}! 👋</h1>
        <p>Continue your SQL learning journey. You've made great progress!</p>
      </div>

      <div className="dashboard-content">
        {/* Quick Stats Grid */}
        <div className="dashboard-grid">
          {quickStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="dashboard-card">
                <div className="card-header">
                  <div 
                    className="card-icon"
                    style={{ backgroundColor: `${stat.color}20`, color: stat.color }}
                  >
                    <Icon size={24} />
                  </div>
                  <div className="card-header-text">
                    <h3>{stat.label}</h3>
                    <span className="card-change" style={{ color: stat.color }}>
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div className="card-value" style={{ color: stat.color }}>
                  {stat.value}
                </div>
                <div className="card-description">{stat.description}</div>
                <div className="card-progress">
                  <div 
                    className="card-progress-bar"
                    style={{ 
                      backgroundColor: `${stat.color}20`,
                    }}
                  >
                    <div 
                      className="card-progress-fill"
                      style={{ 
                        width: stat.label === 'Completion Rate' ? 
                          `${(userProgress.completedTopics / userProgress.totalTopics) * 100}%` :
                          stat.label === 'Accuracy' ? `${userProgress.accuracy}%` :
                          stat.label === 'Learning Streak' ? `${Math.min(userProgress.streakDays * 10, 100)}%` :
                          '75%',
                        backgroundColor: stat.color
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Main Dashboard Sections */}
        <div className="dashboard-sections">
          {/* Left Column */}
          <div className="dashboard-column">
            {/* Continue Learning Section */}
            <div className="dashboard-section">
              <div className="section-header">
                <h3>
                  <BookOpen size={20} />
                  Continue Learning
                </h3>
                <Link to="/learning-path" className="view-all">
                  View all <ArrowRight size={16} />
                </Link>
              </div>
              <div className="continue-learning">
                {upcomingTopics.map((topic, index) => (
                  <div key={topic.id} className="learning-item">
                    <div className={`learning-status ${topic.status}`}>
                      {topic.status === 'completed' ? '✓' : topic.status === 'next' ? '→' : '🔒'}
                    </div>
                    <div className="learning-content">
                      <h4>{topic.title}</h4>
                      <div className="learning-meta">
                        <span className="module-badge">{topic.module}</span>
                        <span className="duration">{topic.duration}</span>
                      </div>
                    </div>
                    <Link 
                      to={topic.status === 'locked' ? '#' : '/learning-path'} 
                      className={`btn btn-small ${topic.status === 'locked' ? 'disabled' : ''}`}
                    >
                      {topic.status === 'next' ? 'Start' : topic.status === 'completed' ? 'Review' : 'Locked'}
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="dashboard-section">
              <div className="section-header">
                <h3>Quick Actions</h3>
                <span className="section-subtitle">Jump right in</span>
              </div>
              <div className="quick-actions-grid">
                {quickActions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <Link key={index} to={action.path} className="quick-action-card">
                      <div 
                        className="action-icon"
                        style={{ backgroundColor: `${action.color}20`, color: action.color }}
                      >
                        <Icon size={24} />
                      </div>
                      <div className="action-content">
                        <h4>{action.label}</h4>
                        <p>{action.description}</p>
                      </div>
                      <ChevronRight size={20} className="action-arrow" />
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="dashboard-column">
            {/* Recent Activity */}
            <div className="dashboard-section">
              <div className="section-header">
                <h3>Recent Activity</h3>
                <Link to="/progress" className="view-all">
                  View all <ArrowRight size={16} />
                </Link>
              </div>
              <div className="recent-activity">
                {recentActivity.map((activity, index) => {
                  const Icon = activity.icon;
                  return (
                    <div key={index} className="activity-item">
                      <div className="activity-icon">
                        <Icon size={18} />
                      </div>
                      <div className="activity-details">
                        <div className="activity-title">
                          <span className="activity-action">{activity.action}</span>
                          <span className="activity-name">{activity.title}</span>
                        </div>
                        <div className="activity-time">{activity.time}</div>
                      </div>
                      <div className={`activity-status ${activity.action}`}>
                        {activity.action}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Motivation Card */}
            <div className="motivation-card">
              <div className="motivation-content">
                <div className="motivation-icon">
                  <Zap size={32} />
                </div>
                <div>
                  <h3>Keep the Streak Alive! 🔥</h3>
                  <p>
                    You've practiced for {userProgress.streakDays} day{userProgress.streakDays !== 1 ? 's' : ''} in a row. 
                    Practice today to maintain your streak!
                  </p>
                </div>
              </div>
              <div className="motivation-progress">
                <div className="streak-days">
                  {[...Array(7)].map((_, i) => (
                    <div 
                      key={i} 
                      className={`streak-day ${i < userProgress.streakDays ? 'active' : ''}`}
                      title={`Day ${i + 1}`}
                    >
                      {i + 1}
                    </div>
                  ))}
                </div>
                <Link to="/learning-path" className="btn btn-primary">
                  Practice Now
                </Link>
              </div>
            </div>

            {/* Weekly Goal */}
            <div className="goal-card">
              <div className="goal-header">
                <h4>Weekly Goal</h4>
                <span className="goal-progress">3/5 topics</span>
              </div>
              <div className="goal-progress-bar">
                <div className="goal-progress-fill" style={{ width: '60%' }}></div>
              </div>
              <div className="goal-description">
                <p>Complete 2 more topics this week to reach your goal!</p>
                <div className="goal-badges">
                  <span className="goal-badge">📚 Learn Daily</span>
                  <span className="goal-badge">💻 Practice Queries</span>
                  <span className="goal-badge">🎯 Take Quizzes</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Quick Tips */}
        <div className="tips-section">
          <h3>💡 Quick Tips for Today</h3>
          <div className="tips-grid">
            <div className="tip-card">
              <div className="tip-icon">🎯</div>
              <h4>Focus on SELECT</h4>
              <p>Master the SELECT statement - it's the foundation of all SQL queries</p>
            </div>
            <div className="tip-card">
              <div className="tip-icon">🔍</div>
              <h4>Practice Filtering</h4>
              <p>Try different WHERE clause conditions to filter data effectively</p>
            </div>
            <div className="tip-card">
              <div className="tip-icon">📊</div>
              <h4>Review Your Progress</h4>
              <p>Check your progress page to identify areas for improvement</p>
            </div>
            <div className="tip-card">
              <div className="tip-icon">⏱️</div>
              <h4>Time Management</h4>
              <p>Spend 30 minutes daily for consistent learning</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;