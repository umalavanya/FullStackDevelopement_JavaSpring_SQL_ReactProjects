import { useState } from 'react';
import { 
  Settings as SettingsIcon,
  User,
  Bell,
  Eye,
  Palette,
  Keyboard,
  Globe,
  Download,
  Shield,
  HelpCircle,
  Save,
  Moon,
  Sun,
  Volume2,
  Clock,
  Target,
  Database,
  Code,
  BookOpen,
  RotateCcw,
  LogOut,
  Trash2,
  Check,
  X
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

const SettingsPage = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  
  const [activeTab, setActiveTab] = useState('general');
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);
  
  // General Settings
  const [generalSettings, setGeneralSettings] = useState({
    language: 'english',
    timezone: 'UTC',
    dateFormat: 'MM/DD/YYYY',
    autoSave: true,
    showTips: true,
    enableAnimations: true,
  });
  
  // Learning Preferences
  const [learningSettings, setLearningSettings] = useState({
    difficulty: 'adaptive',
    dailyGoal: 60, // minutes
    practiceTime: 'morning',
    enableReminders: true,
    reminderTime: '09:00',
    showHints: true,
    autoAdvance: true,
    enableVoice: false,
    enableSubtitles: true,
  });
  
  // Notification Settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    learningReminders: true,
    achievementAlerts: true,
    weeklyReports: true,
    productUpdates: false,
    marketingEmails: false,
  });
  
  // Privacy Settings
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'public',
    showProgress: true,
    showAchievements: true,
    dataCollection: true,
    analyticsTracking: true,
    saveHistory: true,
  });
  
  const tabs = [
    { id: 'general', label: 'General', icon: SettingsIcon },
    { id: 'learning', label: 'Learning', icon: BookOpen },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy', icon: Shield },
    { id: 'account', label: 'Account', icon: User },
  ];
  
  const languages = [
    { value: 'english', label: 'English' },
    { value: 'spanish', label: 'Spanish' },
    { value: 'french', label: 'French' },
    { value: 'german', label: 'German' },
    { value: 'chinese', label: 'Chinese' },
    { value: 'japanese', label: 'Japanese' },
  ];
  
  const timezones = [
    { value: 'UTC', label: 'UTC (Coordinated Universal Time)' },
    { value: 'EST', label: 'EST (Eastern Time)' },
    { value: 'PST', label: 'PST (Pacific Time)' },
    { value: 'GMT', label: 'GMT (Greenwich Mean Time)' },
    { value: 'CET', label: 'CET (Central European Time)' },
  ];
  
  const difficulties = [
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' },
    { value: 'adaptive', label: 'Adaptive (Recommended)' },
  ];
  
  const practiceTimes = [
    { value: 'morning', label: 'Morning (6 AM - 12 PM)' },
    { value: 'afternoon', label: 'Afternoon (12 PM - 6 PM)' },
    { value: 'evening', label: 'Evening (6 PM - 12 AM)' },
    { value: 'night', label: 'Night (12 AM - 6 AM)' },
  ];
  
  const handleSave = async () => {
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setSaveStatus('success');
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setSaveStatus(null);
      }, 3000);
    }, 1000);
  };
  
  const handleReset = (section) => {
    if (window.confirm('Are you sure you want to reset settings to default?')) {
      switch(section) {
        case 'general':
          setGeneralSettings({
            language: 'english',
            timezone: 'UTC',
            dateFormat: 'MM/DD/YYYY',
            autoSave: true,
            showTips: true,
            enableAnimations: true,
          });
          break;
        case 'learning':
          setLearningSettings({
            difficulty: 'adaptive',
            dailyGoal: 60,
            practiceTime: 'morning',
            enableReminders: true,
            reminderTime: '09:00',
            showHints: true,
            autoAdvance: true,
            enableVoice: false,
            enableSubtitles: true,
          });
          break;
        case 'notifications':
          setNotificationSettings({
            emailNotifications: true,
            pushNotifications: true,
            learningReminders: true,
            achievementAlerts: true,
            weeklyReports: true,
            productUpdates: false,
            marketingEmails: false,
          });
          break;
        case 'privacy':
          setPrivacySettings({
            profileVisibility: 'public',
            showProgress: true,
            showAchievements: true,
            dataCollection: true,
            analyticsTracking: true,
            saveHistory: true,
          });
          break;
      }
    }
  };
  
  const handleExportData = () => {
    const data = {
      user: {
        name: user?.name,
        email: user?.email,
        joinDate: user?.joinDate,
      },
      progress: user?.progress,
      settings: {
        general: generalSettings,
        learning: learningSettings,
        notifications: notificationSettings,
        privacy: privacySettings,
      }
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sql-master-data-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  };
  
  const handleDeleteAccount = () => {
    const confirm1 = window.confirm('Are you sure you want to delete your account? This action cannot be undone.');
    if (confirm1) {
      const confirm2 = window.confirm('This will permanently delete all your data, progress, and achievements. Type DELETE to confirm.');
      if (confirm2 === 'DELETE') {
        alert('Account deletion requested. This feature would call an API in a real application.');
        logout();
      }
    }
  };
  
  const renderGeneralSettings = () => (
    <div className="settings-section">
      <div className="section-header">
        <h3>
          <SettingsIcon size={20} />
          General Preferences
        </h3>
        <button 
          onClick={() => handleReset('general')}
          className="btn btn-secondary btn-small"
        >
          <RotateCcw size={16} />
          Reset to Default
        </button>
      </div>
      
      <div className="settings-grid">
        <div className="setting-item">
          <label htmlFor="language">
            <Globe size={18} />
            Language
          </label>
          <select
            id="language"
            value={generalSettings.language}
            onChange={(e) => setGeneralSettings({...generalSettings, language: e.target.value})}
            className="setting-select"
          >
            {languages.map(lang => (
              <option key={lang.value} value={lang.value}>{lang.label}</option>
            ))}
          </select>
        </div>
        
        <div className="setting-item">
          <label htmlFor="timezone">
            <Clock size={18} />
            Timezone
          </label>
          <select
            id="timezone"
            value={generalSettings.timezone}
            onChange={(e) => setGeneralSettings({...generalSettings, timezone: e.target.value})}
            className="setting-select"
          >
            {timezones.map(tz => (
              <option key={tz.value} value={tz.value}>{tz.label}</option>
            ))}
          </select>
        </div>
        
        <div className="setting-item">
          <label htmlFor="dateFormat">
            <SettingsIcon size={18} />
            Date Format
          </label>
          <select
            id="dateFormat"
            value={generalSettings.dateFormat}
            onChange={(e) => setGeneralSettings({...generalSettings, dateFormat: e.target.value})}
            className="setting-select"
          >
            <option value="MM/DD/YYYY">MM/DD/YYYY</option>
            <option value="DD/MM/YYYY">DD/MM/YYYY</option>
            <option value="YYYY-MM-DD">YYYY-MM-DD</option>
          </select>
        </div>
      </div>
      
      <div className="settings-checkboxes">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={generalSettings.autoSave}
            onChange={(e) => setGeneralSettings({...generalSettings, autoSave: e.target.checked})}
          />
          <span>Auto-save progress</span>
        </label>
        
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={generalSettings.showTips}
            onChange={(e) => setGeneralSettings({...generalSettings, showTips: e.target.checked})}
          />
          <span>Show learning tips</span>
        </label>
        
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={generalSettings.enableAnimations}
            onChange={(e) => setGeneralSettings({...generalSettings, enableAnimations: e.target.checked})}
          />
          <span>Enable animations</span>
        </label>
      </div>
    </div>
  );
  
  const renderLearningSettings = () => (
    <div className="settings-section">
      <div className="section-header">
        <h3>
          <BookOpen size={20} />
          Learning Preferences
        </h3>
        <button 
          onClick={() => handleReset('learning')}
          className="btn btn-secondary btn-small"
        >
          <RotateCcw size={16} />
          Reset
        </button>
      </div>
      
      <div className="settings-grid">
        <div className="setting-item">
          <label htmlFor="difficulty">
            <Target size={18} />
            Difficulty Level
          </label>
          <select
            id="difficulty"
            value={learningSettings.difficulty}
            onChange={(e) => setLearningSettings({...learningSettings, difficulty: e.target.value})}
            className="setting-select"
          >
            {difficulties.map(diff => (
              <option key={diff.value} value={diff.value}>{diff.label}</option>
            ))}
          </select>
        </div>
        
        <div className="setting-item">
          <label htmlFor="dailyGoal">
            <Clock size={18} />
            Daily Learning Goal
          </label>
          <div className="range-input">
            <input
              type="range"
              id="dailyGoal"
              min="15"
              max="180"
              step="15"
              value={learningSettings.dailyGoal}
              onChange={(e) => setLearningSettings({...learningSettings, dailyGoal: parseInt(e.target.value)})}
            />
            <span className="range-value">{learningSettings.dailyGoal} minutes</span>
          </div>
        </div>
        
        <div className="setting-item">
          <label htmlFor="practiceTime">
            <Clock size={18} />
            Preferred Practice Time
          </label>
          <select
            id="practiceTime"
            value={learningSettings.practiceTime}
            onChange={(e) => setLearningSettings({...learningSettings, practiceTime: e.target.value})}
            className="setting-select"
          >
            {practiceTimes.map(time => (
              <option key={time.value} value={time.value}>{time.label}</option>
            ))}
          </select>
        </div>
        
        <div className="setting-item">
          <label htmlFor="reminderTime">
            <Bell size={18} />
            Daily Reminder Time
          </label>
          <input
            type="time"
            id="reminderTime"
            value={learningSettings.reminderTime}
            onChange={(e) => setLearningSettings({...learningSettings, reminderTime: e.target.value})}
            className="setting-time"
            disabled={!learningSettings.enableReminders}
          />
        </div>
      </div>
      
      <div className="settings-checkboxes">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={learningSettings.enableReminders}
            onChange={(e) => setLearningSettings({...learningSettings, enableReminders: e.target.checked})}
          />
          <span>Enable daily reminders</span>
        </label>
        
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={learningSettings.showHints}
            onChange={(e) => setLearningSettings({...learningSettings, showHints: e.target.checked})}
          />
          <span>Show hints during practice</span>
        </label>
        
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={learningSettings.autoAdvance}
            onChange={(e) => setLearningSettings({...learningSettings, autoAdvance: e.target.checked})}
          />
          <span>Auto-advance to next topic</span>
        </label>
        
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={learningSettings.enableVoice}
            onChange={(e) => setLearningSettings({...learningSettings, enableVoice: e.target.checked})}
          />
          <span>Enable voice instructions</span>
        </label>
        
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={learningSettings.enableSubtitles}
            onChange={(e) => setLearningSettings({...learningSettings, enableSubtitles: e.target.checked})}
          />
          <span>Enable subtitles for videos</span>
        </label>
      </div>
    </div>
  );
  
  const renderAppearanceSettings = () => (
    <div className="settings-section">
      <div className="section-header">
        <h3>
          <Palette size={20} />
          Appearance
        </h3>
        <span className="section-subtitle">Customize how SQL Master looks</span>
      </div>
      
      <div className="appearance-grid">
        <div className="theme-selector">
          <h4>Theme</h4>
          <div className="theme-options">
            <button 
              className={`theme-option ${!isDarkMode ? 'active' : ''}`}
              onClick={() => !isDarkMode && toggleTheme()}
            >
              <div className="theme-preview light">
                <Sun size={24} />
              </div>
              <span>Light</span>
            </button>
            
            <button 
              className={`theme-option ${isDarkMode ? 'active' : ''}`}
              onClick={() => isDarkMode && toggleTheme()}
            >
              <div className="theme-preview dark">
                <Moon size={24} />
              </div>
              <span>Dark</span>
            </button>
            
            <button className="theme-option">
              <div className="theme-preview auto">
                <SettingsIcon size={24} />
              </div>
              <span>System</span>
            </button>
          </div>
        </div>
        
        <div className="accent-color">
          <h4>Accent Color</h4>
          <div className="color-options">
            {['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#6366f1'].map(color => (
              <button
                key={color}
                className="color-option"
                style={{ backgroundColor: color }}
                onClick={() => document.documentElement.style.setProperty('--primary-color', color)}
              />
            ))}
          </div>
        </div>
        
        <div className="font-settings">
          <h4>Font Size</h4>
          <div className="font-size-control">
            <button className="font-size-btn">A</button>
            <div className="font-size-slider">
              <input 
                type="range" 
                min="12" 
                max="18" 
                defaultValue="16"
                onChange={(e) => document.documentElement.style.fontSize = `${e.target.value}px`}
              />
            </div>
            <button className="font-size-btn large">A</button>
          </div>
        </div>
        
        <div className="layout-settings">
          <h4>Layout Density</h4>
          <div className="layout-options">
            <button className="layout-option active">
              <div className="layout-preview compact"></div>
              <span>Compact</span>
            </button>
            <button className="layout-option">
              <div className="layout-preview comfortable"></div>
              <span>Comfortable</span>
            </button>
            <button className="layout-option">
              <div className="layout-preview spacious"></div>
              <span>Spacious</span>
            </button>
          </div>
        </div>
      </div>
      
      <div className="settings-checkboxes">
        <label className="checkbox-label">
          <input type="checkbox" defaultChecked />
          <span>Reduce motion</span>
        </label>
        <label className="checkbox-label">
          <input type="checkbox" defaultChecked />
          <span>High contrast mode</span>
        </label>
        <label className="checkbox-label">
          <input type="checkbox" />
          <span>Show line numbers in editor</span>
        </label>
      </div>
    </div>
  );
  
  const renderNotificationSettings = () => (
    <div className="settings-section">
      <div className="section-header">
        <h3>
          <Bell size={20} />
          Notifications
        </h3>
        <button 
          onClick={() => handleReset('notifications')}
          className="btn btn-secondary btn-small"
        >
          <RotateCcw size={16} />
          Reset
        </button>
      </div>
      
      <div className="notifications-grid">
        <div className="notification-category">
          <h4>Learning Notifications</h4>
          <div className="notification-options">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={notificationSettings.learningReminders}
                onChange={(e) => setNotificationSettings({...notificationSettings, learningReminders: e.target.checked})}
              />
              <span>Daily learning reminders</span>
            </label>
            
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={notificationSettings.achievementAlerts}
                onChange={(e) => setNotificationSettings({...notificationSettings, achievementAlerts: e.target.checked})}
              />
              <span>Achievement alerts</span>
            </label>
            
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={notificationSettings.weeklyReports}
                onChange={(e) => setNotificationSettings({...notificationSettings, weeklyReports: e.target.checked})}
              />
              <span>Weekly progress reports</span>
            </label>
          </div>
        </div>
        
        <div className="notification-category">
          <h4>Email Notifications</h4>
          <div className="notification-options">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={notificationSettings.emailNotifications}
                onChange={(e) => setNotificationSettings({...notificationSettings, emailNotifications: e.target.checked})}
              />
              <span>Email notifications</span>
            </label>
            
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={notificationSettings.productUpdates}
                onChange={(e) => setNotificationSettings({...notificationSettings, productUpdates: e.target.checked})}
              />
              <span>Product updates</span>
            </label>
            
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={notificationSettings.marketingEmails}
                onChange={(e) => setNotificationSettings({...notificationSettings, marketingEmails: e.target.checked})}
              />
              <span>Marketing emails</span>
            </label>
          </div>
        </div>
        
        <div className="notification-category">
          <h4>Push Notifications</h4>
          <div className="notification-options">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={notificationSettings.pushNotifications}
                onChange={(e) => setNotificationSettings({...notificationSettings, pushNotifications: e.target.checked})}
              />
              <span>Push notifications</span>
            </label>
            
            <div className="notification-desc">
              <p>Receive real-time updates on your device</p>
              <button className="btn btn-secondary btn-small">Configure</button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="notification-schedule">
        <h4>Quiet Hours</h4>
        <p>No notifications will be sent during these hours</p>
        <div className="schedule-inputs">
          <div className="time-input">
            <label>From</label>
            <input type="time" defaultValue="22:00" />
          </div>
          <div className="time-input">
            <label>To</label>
            <input type="time" defaultValue="08:00" />
          </div>
        </div>
      </div>
    </div>
  );
  
  const renderPrivacySettings = () => (
    <div className="settings-section">
      <div className="section-header">
        <h3>
          <Shield size={20} />
          Privacy & Data
        </h3>
        <button 
          onClick={() => handleReset('privacy')}
          className="btn btn-secondary btn-small"
        >
          <RotateCcw size={16} />
          Reset
        </button>
      </div>
      
      <div className="privacy-grid">
        <div className="privacy-item">
          <h4>Profile Visibility</h4>
          <select
            value={privacySettings.profileVisibility}
            onChange={(e) => setPrivacySettings({...privacySettings, profileVisibility: e.target.value})}
            className="privacy-select"
          >
            <option value="public">Public</option>
            <option value="friends">Friends Only</option>
            <option value="private">Private</option>
          </select>
          <p className="privacy-description">Control who can see your profile and progress</p>
        </div>
        
        <div className="privacy-item">
          <h4>Data Collection</h4>
          <div className="privacy-options">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={privacySettings.dataCollection}
                onChange={(e) => setPrivacySettings({...privacySettings, dataCollection: e.target.checked})}
              />
              <span>Allow anonymous data collection</span>
            </label>
            <p className="privacy-description">Help us improve by sharing anonymous usage data</p>
            
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={privacySettings.analyticsTracking}
                onChange={(e) => setPrivacySettings({...privacySettings, analyticsTracking: e.target.checked})}
              />
              <span>Enable analytics tracking</span>
            </label>
          </div>
        </div>
        
        <div className="privacy-item">
          <h4>Progress Sharing</h4>
          <div className="privacy-options">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={privacySettings.showProgress}
                onChange={(e) => setPrivacySettings({...privacySettings, showProgress: e.target.checked})}
              />
              <span>Show my learning progress</span>
            </label>
            
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={privacySettings.showAchievements}
                onChange={(e) => setPrivacySettings({...privacySettings, showAchievements: e.target.checked})}
              />
              <span>Show my achievements</span>
            </label>
            
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={privacySettings.saveHistory}
                onChange={(e) => setPrivacySettings({...privacySettings, saveHistory: e.target.checked})}
              />
              <span>Save practice history</span>
            </label>
          </div>
        </div>
      </div>
      
      <div className="data-management">
        <h4>Data Management</h4>
        <div className="data-actions">
          <button onClick={handleExportData} className="btn btn-secondary">
            <Download size={16} />
            Export My Data
          </button>
          <button className="btn btn-secondary">
            <Database size={16} />
            Clear Practice History
          </button>
          <button className="btn btn-secondary">
            <Eye size={16} />
            View Privacy Policy
          </button>
        </div>
      </div>
    </div>
  );
  
  const renderAccountSettings = () => (
    <div className="settings-section">
      <div className="section-header">
        <h3>
          <User size={20} />
          Account Management
        </h3>
        <span className="section-subtitle">Manage your account and data</span>
      </div>
      
      <div className="account-info">
        <div className="info-card">
          <h4>Account Information</h4>
          <div className="info-grid">
            <div className="info-item">
              <span className="info-label">Name</span>
              <span className="info-value">{user?.name || 'Not set'}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Email</span>
              <span className="info-value">{user?.email || 'Not set'}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Member Since</span>
              <span className="info-value">
                {user?.joinDate ? new Date(user.joinDate).toLocaleDateString() : 'N/A'}
              </span>
            </div>
            <div className="info-item">
              <span className="info-label">User ID</span>
              <span className="info-value">{user?.id || 'N/A'}</span>
            </div>
          </div>
        </div>
        
        <div className="account-stats">
          <h4>Learning Statistics</h4>
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-label">Topics Completed</span>
              <span className="stat-value">{user?.progress?.completedTopics?.length || 0}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Learning Streak</span>
              <span className="stat-value">{user?.progress?.streakDays || 0} days</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Total Time</span>
              <span className="stat-value">
                {Math.floor((user?.progress?.totalTimeSpent || 0) / 60)}h {(user?.progress?.totalTimeSpent || 0) % 60}m
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="account-actions">
        <h4>Account Actions</h4>
        <div className="action-buttons">
          <button className="btn btn-secondary">
            <User size={16} />
            Update Profile
          </button>
          <button className="btn btn-secondary">
            <Shield size={16} />
            Change Password
          </button>
          <button className="btn btn-secondary">
            <Globe size={16} />
            Linked Accounts
          </button>
          <button onClick={logout} className="btn btn-secondary">
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      </div>
      
      <div className="danger-zone">
        <h4>
          <Trash2 size={20} color="var(--danger-color)" />
          Danger Zone
        </h4>
        <div className="danger-actions">
          <div className="danger-action">
            <div className="danger-info">
              <h5>Delete Practice Data</h5>
              <p>Remove all your practice history, progress, and achievements</p>
            </div>
            <button className="btn btn-danger">
              Delete Data
            </button>
          </div>
          
          <div className="danger-action">
            <div className="danger-info">
              <h5>Delete Account</h5>
              <p>Permanently delete your account and all associated data</p>
            </div>
            <button onClick={handleDeleteAccount} className="btn btn-danger">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
  
  const renderContent = () => {
    switch(activeTab) {
      case 'general': return renderGeneralSettings();
      case 'learning': return renderLearningSettings();
      case 'appearance': return renderAppearanceSettings();
      case 'notifications': return renderNotificationSettings();
      case 'privacy': return renderPrivacySettings();
      case 'account': return renderAccountSettings();
      default: return renderGeneralSettings();
    }
  };
  
  return (
    <div className="container">
      <div className="page-header">
        <h1>
          <SettingsIcon size={28} />
          Settings
        </h1>
        <p>Customize your SQL Master experience</p>
      </div>
      
      <div className="settings-container">
        <div className="settings-sidebar">
          <div className="sidebar-header">
            <h3>Settings</h3>
            <p>Manage your preferences</p>
          </div>
          
          <div className="sidebar-tabs">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  className={`sidebar-tab ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <Icon size={18} />
                  {tab.label}
                </button>
              );
            })}
          </div>
          
          <div className="sidebar-help">
            <HelpCircle size={18} />
            <div>
              <h4>Need Help?</h4>
              <p>Check our documentation or contact support</p>
            </div>
          </div>
        </div>
        
        <div className="settings-main">
          <div className="settings-header">
            <h2>
              {tabs.find(t => t.id === activeTab)?.label || 'Settings'}
            </h2>
            
            <div className="header-actions">
              {saveStatus === 'success' && (
                <div className="save-success">
                  <Check size={16} />
                  Settings saved successfully!
                </div>
              )}
              
              <button 
                onClick={handleSave} 
                className="btn btn-primary"
                disabled={isSaving}
              >
                {isSaving ? (
                  <>
                    <span className="spinner"></span>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={16} />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </div>
          
          <div className="settings-content">
            {renderContent()}
          </div>
          
          <div className="settings-footer">
            <div className="version-info">
              <span className="version">Version 1.0.0</span>
              <span className="update">Last updated: Today</span>
            </div>
            
            <div className="quick-links">
              <a href="/privacy">Privacy Policy</a>
              <a href="/terms">Terms of Service</a>
              <a href="/help">Help Center</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;