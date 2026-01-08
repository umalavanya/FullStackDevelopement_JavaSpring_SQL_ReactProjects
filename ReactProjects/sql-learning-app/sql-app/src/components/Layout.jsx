import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, Code, TrendingUp, Brain } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const Layout = ({ children }) => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', icon: Home, label: 'Dashboard' },
    { path: '/learning-path', icon: BookOpen, label: 'Learning Path' },
    { path: '/practice', icon: Code, label: 'Practice' },
    { path: '/progress', icon: TrendingUp, label: 'Progress' },
    { path: '/self-evaluation', icon: Brain, label: 'Self Evaluation' },
  ];

  return (
    <div className="layout">
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
                SQL
              </div>
              <div className="user-info">
                <div className="user-name">SQL Learner</div>
                <div className="user-status">Learning SQL</div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

export default Layout;