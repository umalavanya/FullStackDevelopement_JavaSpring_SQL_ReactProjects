import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  User, 
  LogOut, 
  Settings, 
  Bell, 
  ChevronDown,
  Award,
  TrendingUp
} from 'lucide-react';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setShowUserMenu(false);
  };

  const notifications = [
    { id: 1, text: 'New challenge unlocked!', time: '2 hours ago', read: false },
    { id: 2, text: 'You completed "SELECT Basics"', time: '1 day ago', read: true },
    { id: 3, text: 'Weekly progress report ready', time: '2 days ago', read: true },
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="app-header">
      <div className="header-left">
        <Link to="/" className="logo-link">
          <h1 className="logo">SQL Master</h1>
          <span className="logo-subtitle">Learn • Practice • Master</span>
        </Link>
      </div>

      <div className="header-center">
        <div className="quick-stats">
          <div className="stat-item">
            <Award size={16} />
            <span>{user?.progress?.completedTopics?.length || 0} Topics</span>
          </div>
          <div className="stat-item">
            <TrendingUp size={16} />
            <span>{user?.progress?.streakDays || 0} Day Streak</span>
          </div>
        </div>
      </div>

      <div className="header-right">
        <div className="header-actions">
          <div className="notifications-container">
            <button 
              className="notification-btn"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell size={20} />
              {unreadCount > 0 && (
                <span className="notification-badge">{unreadCount}</span>
              )}
            </button>

            {showNotifications && (
              <div className="notifications-dropdown">
                <div className="notifications-header">
                  <h4>Notifications</h4>
                  <button className="mark-all-read">Mark all as read</button>
                </div>
                <div className="notifications-list">
                  {notifications.map(notification => (
                    <div 
                      key={notification.id} 
                      className={`notification-item ${!notification.read ? 'unread' : ''}`}
                    >
                      <div className="notification-content">
                        <p>{notification.text}</p>
                        <span className="notification-time">{notification.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="notifications-footer">
                  <Link to="/notifications">View all notifications</Link>
                </div>
              </div>
            )}
          </div>

          <div className="user-menu-container">
            <button 
              className="user-menu-btn"
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              <div className="user-avatar">
                {user?.avatar || '👤'}
              </div>
              <div className="user-info">
                <span className="user-name">{user?.name || 'Guest'}</span>
                <span className="user-role">SQL Learner</span>
              </div>
              <ChevronDown size={16} />
            </button>

            {showUserMenu && (
              <div className="user-menu-dropdown">
                <div className="user-menu-header">
                  <div className="menu-avatar">
                    {user?.avatar || '👤'}
                  </div>
                  <div className="menu-user-info">
                    <h4>{user?.name || 'Guest'}</h4>
                    <p>{user?.email || 'guest@example.com'}</p>
                  </div>
                </div>

                <div className="user-menu-stats">
                  <div className="menu-stat">
                    <span className="stat-value">{user?.progress?.completedTopics?.length || 0}</span>
                    <span className="stat-label">Topics</span>
                  </div>
                  <div className="menu-stat">
                    <span className="stat-value">{user?.progress?.streakDays || 0}</span>
                    <span className="stat-label">Days</span>
                  </div>
                  <div className="menu-stat">
                    <span className="stat-value">
                      {user?.progress?.completedTopics?.length ? 
                        Math.round((user.progress.completedTopics.length / 9) * 100) : 0}%
                    </span>
                    <span className="stat-label">Progress</span>
                  </div>
                </div>

                <div className="user-menu-items">
                  <Link to="/profile" className="menu-item">
                    <User size={18} />
                    <span>My Profile</span>
                  </Link>
                  <Link to="/settings" className="menu-item">
                    <Settings size={18} />
                    <span>Settings</span>
                  </Link>
                  <Link to="/achievements" className="menu-item">
                    <Award size={18} />
                    <span>Achievements</span>
                  </Link>
                  
                  <div className="menu-divider"></div>
                  
                  <button onClick={handleLogout} className="menu-item logout">
                    <LogOut size={18} />
                    <span>Log Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;