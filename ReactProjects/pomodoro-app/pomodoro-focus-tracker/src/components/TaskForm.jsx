import React, { useState } from 'react';
import { PlayCircle, Target, Clock } from 'lucide-react';

const TaskForm = ({ onStartSession }) => {
  const [taskTitle, setTaskTitle] = useState('');
  const [selectedTime, setSelectedTime] = useState(25);
  const [customTime, setCustomTime] = useState('');

  const timeOptions = [15, 25, 30, 45, 50, 60];

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const time = customTime && customTime >= 1 ? parseInt(customTime) : selectedTime;
    
    if (!taskTitle.trim()) {
      alert('Please enter a task title');
      return;
    }
    
    onStartSession({
      title: taskTitle,
      time: time
    });
    
    setTaskTitle('');
    setCustomTime('');
  };

  return (
    <div className="card">
      <h2 className="card-title">
        <Target className="icon" />
        New Focus Session
      </h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="taskTitle">Task Title</label>
          <input
            type="text"
            id="taskTitle"
            placeholder="What do you want to focus on?"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="timeSelect">Focus Duration (minutes)</label>
          <div className="flex" style={{ flexWrap: 'wrap', gap: '10px', marginBottom: '10px' }}>
            {timeOptions.map((time) => (
              <button
                key={time}
                type="button"
                className={`btn ${selectedTime === time ? 'btn-primary' : 'btn-secondary'}`}
                style={{ padding: '8px 16px' }}
                onClick={() => {
                  setSelectedTime(time);
                  setCustomTime('');
                }}
              >
                {time} min
              </button>
            ))}
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span>Or custom:</span>
            <input
              type="number"
              placeholder="Custom minutes"
              min="1"
              max="240"
              value={customTime}
              onChange={(e) => {
                setCustomTime(e.target.value);
                if (e.target.value) setSelectedTime(null);
              }}
              style={{ width: '120px' }}
            />
            <span>minutes</span>
          </div>
        </div>
        
        <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
          <PlayCircle className="icon" />
          Start Focus Session
        </button>
      </form>
    </div>
  );
};

export default TaskForm;