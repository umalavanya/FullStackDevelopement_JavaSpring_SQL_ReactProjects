import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  User, 
  Mail, 
  Calendar, 
  Award, 
  Clock, 
  Edit2,
  Save,
  X
} from 'lucide-react';

const Profile = () => {
  const { user, updateUserProgress } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: 'Passionate about learning SQL and database management. Currently focusing on mastering advanced queries and optimization techniques.'
  });

  const stats = [
    { label: 'Topics Completed', value: user?.progress?.completedTopics?.length || 0, icon: Award },
    { label: 'Learning Streak', value: `${user?.progress?.streakDays || 0} days`, icon: Calendar },
    { label: 'Time Spent', value: `${Math.floor((user?.progress?.totalTimeSpent || 0) / 60)}h ${(user?.progress?.totalTimeSpent || 0) % 60}m`, icon: Clock },
    { label: 'Accuracy Rate', value: '78%', icon: Award },
  ];

  const handleSave = () => {
    // In real app, this would update user profile via API
    setIsEditing(false);
  };

  const handleCancel = () => {
    setProfileData({
      name: user?.name || '',
      email: user?.email || '',
      bio: 'Passionate about learning SQL and database management...'
    });
    setIsEditing(false);
  };

  return (
    <div className="container">
      <div className="page-header">
        <h1>My Profile</h1>
        <p>Manage your account and track your learning progress</p>
      </div>

      <div className="profile-layout">
        <div className="profile-sidebar">
          <div className="profile-card">
            <div className="profile-avatar">
              <div className="avatar-large">
                {user?.avatar || '👤'}
              </div>
              {isEditing && (
                <button className="avatar-edit">
                  <Edit2 size={16} />
                </button>
              )}
            </div>
            
            <div className="profile-info">
              {isEditing ? (
                <div className="profile-form">
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label>Bio</label>
                    <textarea
                      value={profileData.bio}
                      onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                      rows={4}
                    />
                  </div>
                </div>
              ) : (
                <>
                  <h2>{user?.name}</h2>
                  <p className="profile-email">
                    <Mail size={16} />
                    {user?.email}
                  </p>
                  <p className="profile-join-date">
                    <Calendar size={16} />
                    Joined {new Date(user?.joinDate).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long' 
                    })}
                  </p>
                  <p className="profile-bio">{profileData.bio}</p>
                </>
              )}
            </div>

            <div className="profile-actions">
              {isEditing ? (
                <div className="edit-actions">
                  <button onClick={handleSave} className="btn btn-primary">
                    <Save size={16} />
                    Save Changes
                  </button>
                  <button onClick={handleCancel} className="btn btn-secondary">
                    <X size={16} />
                    Cancel
                  </button>
                </div>
              ) : (
                <button onClick={() => setIsEditing(true)} className="btn btn-primary">
                  <Edit2 size={16} />
                  Edit Profile
                </button>
              )}
            </div>
          </div>

          <div className="achievements-card">
            <h3>Recent Achievements</h3>
            <div className="achievements-list">
              <div className="achievement-item">
                <div className="achievement-icon">🚀</div>
                <div>
                  <h4>First Query</h4>
                  <p>Ran your first SQL query</p>
                </div>
              </div>
              <div className="achievement-item">
                <div className="achievement-icon">📚</div>
                <div>
                  <h4>Quick Learner</h4>
                  <p>Completed 3 topics in one day</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="profile-main">
          <div className="stats-grid">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="stat-card">
                  <div className="stat-icon">
                    <Icon size={24} />
                  </div>
                  <div className="stat-content">
                    <div className="stat-value">{stat.value}</div>
                    <div className="stat-label">{stat.label}</div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="progress-section">
            <h3>Learning Progress</h3>
            <div className="progress-chart">
              {/* Progress visualization would go here */}
              <div className="chart-placeholder">
                <p>Progress chart visualization</p>
              </div>
            </div>
          </div>

          <div className="recent-activity-section">
            <h3>Recent Activity</h3>
            <div className="activity-list">
              <div className="activity-item">
                <div className="activity-icon">✅</div>
                <div className="activity-content">
                  <h4>Completed "SELECT Basics"</h4>
                  <p>2 hours ago</p>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-icon">💻</div>
                <div className="activity-content">
                  <h4>Solved "Second Highest Salary"</h4>
                  <p>1 day ago</p>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-icon">📊</div>
                <div className="activity-content">
                  <h4>Took "Basic SQL Quiz"</h4>
                  <p>2 days ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;