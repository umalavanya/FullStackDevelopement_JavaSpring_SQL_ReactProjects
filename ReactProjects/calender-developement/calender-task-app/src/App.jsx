import React, { useState } from 'react';
import { useAuth } from './context/AuthContext';
import Login from './components/Login';
import Calendar from './components/Calendar';
import Settings from './components/Settings';
import ThemeToggle from './components/ThemeToggle';
import './App.css';

function App() {
  const { user, logout, theme, toggleTheme, font, changeFont } = useAuth();
  const [showSettings, setShowSettings] = useState(false);

  if (!user) {
    return <Login />;
  }

  return (
    <div className={`app ${theme}`} style={{ fontFamily: font }}>
      <header className="app-header">
        <div className="header-left">
          <h1>✨ TaskCalendar</h1>
          <p>Welcome, {user.username}!</p>
        </div>
        <div className="header-right">
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          <button onClick={() => setShowSettings(!showSettings)} className="settings-button">
            ⚙️ Settings
          </button>
          <button onClick={logout} className="logout-button">
            👋 Logout
          </button>
        </div>
      </header>

      <main className="app-main">
        {showSettings ? (
          <Settings
            theme={theme}
            toggleTheme={toggleTheme}
            font={font}
            changeFont={changeFont}
          />
        ) : (
          <Calendar />
        )}
      </main>

      <footer className="app-footer">
        <p>Made with ❤️ using React & Vite</p>
        <p>Drag and click to manage your tasks!</p>
      </footer>
    </div>
  );
}

export default App;