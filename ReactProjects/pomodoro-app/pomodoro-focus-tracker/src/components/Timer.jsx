import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Flag } from 'lucide-react';

const Timer = ({ session, onComplete, onDistraction, isActive }) => {
  const [timeLeft, setTimeLeft] = useState(session ? session.time * 60 : 0);
  const [isRunning, setIsRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const alarmSound = useRef(null);

  useEffect(() => {
    if (session) {
      setTimeLeft(session.time * 60);
      setIsRunning(true);
      setIsCompleted(false);
    }
  }, [session]);

  useEffect(() => {
    alarmSound.current = new Audio('data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAZGF0YQQAAAAAAA==');
    
    // Create a simple beep sound
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    gainNode.gain.value = 0.5;
    
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.5);
    
    const beepBlob = new Blob([], { type: 'audio/wav' });
    alarmSound.current = new Audio(URL.createObjectURL(beepBlob));
    
    return () => {
      if (alarmSound.current) {
        alarmSound.current.pause();
      }
    };
  }, []);

  useEffect(() => {
    let interval = null;
    
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prevTime => {
          if (prevTime <= 1) {
            clearInterval(interval);
            setIsRunning(false);
            setIsCompleted(true);
            if (alarmSound.current) {
              alarmSound.current.play().catch(e => console.log("Audio play failed:", e));
            }
            if (onComplete) {
              onComplete();
            }
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else if (!isRunning && timeLeft !== 0) {
      clearInterval(interval);
    }
    
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, onComplete]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleTimer = () => {
    if (timeLeft > 0) {
      setIsRunning(!isRunning);
    }
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(session ? session.time * 60 : 0);
    setIsCompleted(false);
  };

  const handleDistraction = () => {
    if (onDistraction) {
      onDistraction();
    }
  };

  const progress = session ? ((session.time * 60 - timeLeft) / (session.time * 60)) * 100 : 0;

  if (!session) {
    return (
      <div className="card">
        <h2 className="card-title">
          <Play className="icon" />
          Timer
        </h2>
        <div className="empty-state">
          <p>No active session. Start a focus session to begin timing.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <h2 className="card-title">
        <Play className="icon" />
        Focus Timer
      </h2>
      
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h3 style={{ fontSize: '1.5rem', color: 'var(--dark)' }}>{session.title}</h3>
        <p style={{ color: 'var(--gray)' }}>Focus for {session.time} minutes</p>
      </div>
      
      <div className="timer-display">
        {formatTime(timeLeft)}
      </div>
      
      <div className="progress-container">
        <div className="progress-label">
          <span>Progress</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
      
      <div className="timer-controls">
        <button 
          className={`btn ${isRunning ? 'btn-danger' : 'btn-success'}`} 
          onClick={toggleTimer}
          disabled={timeLeft === 0}
        >
          {isRunning ? <Pause className="icon" /> : <Play className="icon" />}
          {isRunning ? 'Pause' : 'Resume'}
        </button>
        
        <button className="btn btn-secondary" onClick={resetTimer}>
          <RotateCcw className="icon" />
          Reset
        </button>
        
        <button 
          className="btn btn-secondary" 
          onClick={handleDistraction}
          disabled={!isRunning}
        >
          <Flag className="icon" />
          Log Distraction
        </button>
      </div>
      
      {isCompleted && (
        <div className="session-complete">
          <h3 style={{ color: 'var(--success)' }}>🎉 Session Complete!</h3>
          <p>Great job focusing on "{session.title}" for {session.time} minutes!</p>
          <p>Check your statistics to see your progress.</p>
        </div>
      )}
    </div>
  );
};

export default Timer;