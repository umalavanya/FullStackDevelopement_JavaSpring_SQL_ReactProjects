import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import Timer from './components/Timer';
import DistractionLog from './components/DistractionLog';
import Stats from './components/Stats';
import { Zap } from 'lucide-react';
import './App.css';

function App() {
  const [activeSession, setActiveSession] = useState(null);
  const [completedSessions, setCompletedSessions] = useState([]);
  const [distractions, setDistractions] = useState([]);
  const [isSessionActive, setIsSessionActive] = useState(false);

  // Load data from localStorage on initial render
  useEffect(() => {
    const savedSessions = localStorage.getItem('pomodoroSessions');
    const savedDistractions = localStorage.getItem('pomodoroDistractions');
    
    if (savedSessions) {
      setCompletedSessions(JSON.parse(savedSessions));
    }
    
    if (savedDistractions) {
      setDistractions(JSON.parse(savedDistractions));
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('pomodoroSessions', JSON.stringify(completedSessions));
  }, [completedSessions]);

  useEffect(() => {
    localStorage.setItem('pomodoroDistractions', JSON.stringify(distractions));
  }, [distractions]);

  const handleStartSession = (sessionData) => {
    const newSession = {
      ...sessionData,
      id: Date.now(),
      startTime: new Date().toISOString()
    };
    
    setActiveSession(newSession);
    setIsSessionActive(true);
  };

  const handleSessionComplete = () => {
    if (activeSession) {
      const completedSession = {
        ...activeSession,
        completedAt: new Date().toISOString(),
        distractionsDuringSession: distractions.filter(d => 
          d.sessionId === activeSession.id
        ).length
      };
      
      setCompletedSessions(prev => [completedSession, ...prev]);
      setActiveSession(null);
      setIsSessionActive(false);
      
      // Clear distractions for this session
      setDistractions(prev => prev.filter(d => d.sessionId !== activeSession.id));
    }
  };

  const handleDistraction = () => {
    if (!activeSession) return;
    
    const sessionStartTime = new Date(activeSession.startTime);
    const now = new Date();
    const minutesIntoSession = Math.floor((now - sessionStartTime) / (1000 * 60));
    
    const newDistraction = {
      id: Date.now(),
      sessionId: activeSession.id,
      time: new Date().toISOString(),
      sessionTime: minutesIntoSession,
      note: `Distraction during "${activeSession.title}"`
    };
    
    setDistractions(prev => [newDistraction, ...prev]);
    
    // Pause the timer when logging a distraction
    // This would require passing a pause function to Timer
    // For now, we'll just log it
  };

  const handleClearDistractions = () => {
    if (window.confirm("Are you sure you want to clear all distraction logs?")) {
      setDistractions([]);
    }
  };

  return (
    <div className="container">
      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1>
          <Zap style={{ display: 'inline-block', marginRight: '10px' }} />
          Pomodoro Focus Tracker
        </h1>
        <p className="subtitle">
          Boost your productivity with timed focus sessions and track your distractions
        </p>
      </header>
      
      <div className="app-container">
        <div>
          <TaskForm onStartSession={handleStartSession} />
          
          <div style={{ marginTop: '30px' }}>
            <Timer 
              session={activeSession}
              onComplete={handleSessionComplete}
              onDistraction={handleDistraction}
              isActive={isSessionActive}
            />
          </div>
          
          <div style={{ marginTop: '30px' }}>
            <DistractionLog 
              distractions={distractions.filter(d => d.sessionId === (activeSession?.id || null))}
              onClear={handleClearDistractions}
            />
          </div>
        </div>
        
        <div>
          <Stats 
            sessions={completedSessions}
            distractions={distractions}
          />
          
          {completedSessions.length > 0 && (
            <div className="card" style={{ marginTop: '30px' }}>
              <h2 className="card-title">Recent Sessions</h2>
              <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                {completedSessions.slice(0, 5).map((session, index) => (
                  <div key={index} style={{
                    padding: '15px',
                    backgroundColor: index % 2 === 0 ? 'var(--light)' : 'white',
                    borderRadius: 'var(--radius-sm)',
                    marginBottom: '10px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div>
                      <div style={{ fontWeight: '600', color: 'var(--dark)' }}>{session.title}</div>
                      <div style={{ fontSize: '0.9rem', color: 'var(--gray)' }}>
                        {new Date(session.completedAt).toLocaleDateString()} • {session.time} minutes
                      </div>
                    </div>
                    <div style={{ 
                      padding: '5px 10px', 
                      backgroundColor: 'var(--primary)', 
                      color: 'white',
                      borderRadius: '20px',
                      fontSize: '0.8rem',
                      fontWeight: '600'
                    }}>
                      Completed
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      <footer style={{ 
        marginTop: '50px', 
        textAlign: 'center', 
        color: 'var(--gray)',
        fontSize: '0.9rem',
        padding: '20px',
        borderTop: '1px solid var(--gray-light)'
      }}>
        <p>Pomodoro Focus Tracker • Built with React • Stay focused, achieve more!</p>
      </footer>
    </div>
  );
}

export default App;