import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, Code, TrendingUp, Brain, Settings, FileText } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const location = useLocation();
  const { user } = useAuth();
  
  const navItems = [
    { path: '/', icon: Home, label: 'Dashboard' },
    { path: '/learning-path', icon: BookOpen, label: 'Learning Path' },
    { path: '/practice', icon: Code, label: 'Practice' },
    { path: '/self-evaluation', icon: Brain, label: 'Self Evaluation' },
    { path: '/notes', icon: FileText, label: 'Notes' },
    { path: '/progress', icon: TrendingUp, label: 'Progress' },
    { path: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <nav className="sidebar">
      <div className="logo">
        <h2>SQL Master</h2>
        <p>Learn MS SQL Step by Step</p>
      </div>
      
      <div className="nav-items">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item ${isActive ? 'active' : ''}`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </Link>
          );
        })}
        
        <div className="nav-divider"></div>
        
        <ThemeToggle />
        
        <div className="sidebar-footer">
          <div className="user-profile">
            <div className="avatar">
              {user?.avatar || '👤'}
            </div>
            <div className="user-info">
              <div className="user-name">{user?.name || 'Guest'}</div>
              <div className="user-status">
                {user?.progress?.completedTopics?.length || 0} topics completed
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;