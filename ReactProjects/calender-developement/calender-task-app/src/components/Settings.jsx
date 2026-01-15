import React from 'react';
import './Settings.css';

const Settings = ({ theme, toggleTheme, font, changeFont }) => {
  const fonts = ['Arial', 'Helvetica', 'Georgia', 'Times New Roman', 'Courier New', 'Comic Sans MS', 'Verdana'];

  return (
    <div className="settings-container">
      <h2>Settings</h2>
      
      <div className="setting-section">
        <h3>Theme</h3>
        <button onClick={toggleTheme} className="theme-toggle">
          Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme
        </button>
      </div>

      <div className="setting-section">
        <h3>Font Style</h3>
        <div className="font-options">
          {fonts.map((fontOption) => (
            <button
              key={fontOption}
              onClick={() => changeFont(fontOption)}
              className={`font-option ${font === fontOption ? 'active' : ''}`}
              style={{ fontFamily: fontOption }}
            >
              {fontOption}
            </button>
          ))}
        </div>
      </div>

      <div className="setting-section">
        <h3>Colors</h3>
        <div className="color-palette">
          <div className="color-sample" style={{ backgroundColor: '#ff6bcb' }}></div>
          <div className="color-sample" style={{ backgroundColor: '#8a2be2' }}></div>
          <div className="color-sample" style={{ backgroundColor: '#9370db' }}></div>
          <div className="color-sample" style={{ backgroundColor: '#d870ff' }}></div>
          <div className="color-sample" style={{ backgroundColor: '#ff69b4' }}></div>
        </div>
      </div>
    </div>
  );
};

export default Settings;