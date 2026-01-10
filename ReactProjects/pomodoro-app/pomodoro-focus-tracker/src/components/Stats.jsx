import React from 'react';
import { Target, Clock, Zap, TrendingUp, AlertCircle } from 'lucide-react';

const Stats = ({ sessions, distractions }) => {
  const totalFocusTime = sessions.reduce((total, session) => total + session.time, 0);
  const totalSessions = sessions.length;
  const totalDistractions = distractions.length;
  
  const avgFocusTime = totalSessions > 0 ? (totalFocusTime / totalSessions).toFixed(1) : 0;
  const focusRate = totalFocusTime > 0 
    ? Math.max(0, 100 - (totalDistractions / totalFocusTime) * 100).toFixed(1) 
    : 100;
  
  const today = new Date().toLocaleDateString();
  const todaySessions = sessions.filter(s => 
    new Date(s.completedAt).toLocaleDateString() === today
  ).length;
  
  const todayFocusTime = sessions
    .filter(s => new Date(s.completedAt).toLocaleDateString() === today)
    .reduce((total, session) => total + session.time, 0);

  return (
    <div className="card">
      <h2 className="card-title">
        <TrendingUp className="icon" />
        Focus Statistics
      </h2>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">{totalFocusTime}</div>
          <div className="stat-label">Total Focus Minutes</div>
          <Clock className="icon" style={{ marginTop: '10px', color: 'var(--primary)' }} />
        </div>
        
        <div className="stat-card">
          <div className="stat-value">{totalSessions}</div>
          <div className="stat-label">Completed Sessions</div>
          <Target className="icon" style={{ marginTop: '10px', color: 'var(--primary)' }} />
        </div>
        
        <div className="stat-card">
          <div className="stat-value">{avgFocusTime}</div>
          <div className="stat-label">Avg. Session (min)</div>
          <Clock className="icon" style={{ marginTop: '10px', color: 'var(--primary)' }} />
        </div>
        
        <div className="stat-card">
          <div className="stat-value">{totalDistractions}</div>
          <div className="stat-label">Total Distractions</div>
          <AlertCircle className="icon" style={{ marginTop: '10px', color: 'var(--danger)' }} />
        </div>
      </div>
      
      <div style={{ marginTop: '30px' }}>
        <h3 style={{ marginBottom: '15px' }}>Today's Progress</h3>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '1.2rem', fontWeight: '600', color: 'var(--dark)' }}>
              {todayFocusTime} minutes
            </div>
            <div style={{ color: 'var(--gray)' }}>Focus time today</div>
          </div>
          <div>
            <div style={{ fontSize: '1.2rem', fontWeight: '600', color: 'var(--dark)' }}>
              {todaySessions}
            </div>
            <div style={{ color: 'var(--gray)' }}>Sessions today</div>
          </div>
          <div>
            <div style={{ fontSize: '1.2rem', fontWeight: '600', color: focusRate > 80 ? 'var(--success)' : focusRate > 60 ? 'var(--secondary)' : 'var(--danger)' }}>
              {focusRate}%
            </div>
            <div style={{ color: 'var(--gray)' }}>Focus rate</div>
          </div>
        </div>
      </div>
      
      <div style={{ marginTop: '30px', padding: '15px', backgroundColor: 'var(--light)', borderRadius: 'var(--radius-sm)' }}>
        <h4 style={{ marginBottom: '10px' }}>Focus Tips</h4>
        <ul style={{ paddingLeft: '20px', color: 'var(--gray)' }}>
          <li>Start with shorter sessions and gradually increase time</li>
          <li>Take 5-minute breaks between sessions</li>
          <li>Track distractions to identify patterns</li>
          <li>Celebrate small wins to stay motivated</li>
        </ul>
      </div>
    </div>
  );
};

export default Stats;