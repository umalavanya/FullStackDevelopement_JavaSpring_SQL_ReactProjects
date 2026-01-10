import React from 'react';
import { XCircle, AlertCircle } from 'lucide-react';

const DistractionLog = ({ distractions, onClear }) => {
  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 className="card-title">
          <AlertCircle className="icon" />
          Distraction Log
        </h2>
        
        {distractions.length > 0 && (
          <button className="btn btn-secondary" onClick={onClear} style={{ padding: '8px 16px' }}>
            <XCircle className="icon" />
            Clear All
          </button>
        )}
      </div>
      
      {distractions.length === 0 ? (
        <div className="empty-state">
          <p>No distractions logged yet. Stay focused! 🎯</p>
        </div>
      ) : (
        <div className="distraction-list">
          {distractions.map((distraction, index) => (
            <div key={index} className="distraction-item">
              <div>
                <div className="distraction-time">{formatTime(distraction.time)}</div>
                <div className="distraction-note">{distraction.note || "No note provided"}</div>
              </div>
              <div style={{ color: 'var(--danger)', fontWeight: '600' }}>
                {distraction.sessionTime} min into session
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div style={{ marginTop: '20px', color: 'var(--gray)', fontSize: '0.9rem' }}>
        <p>Each time you get distracted during a focus session, click "Log Distraction" to track it.</p>
      </div>
    </div>
  );
};

export default DistractionLog;