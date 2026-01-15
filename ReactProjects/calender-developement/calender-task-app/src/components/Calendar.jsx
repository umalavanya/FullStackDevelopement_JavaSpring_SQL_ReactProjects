import React, { useState, useEffect } from 'react';
import Task from './Task';
import './Calendar.css';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [tasks, setTasks] = useState({});
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium',
    time: '09:00'
  });

  const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const getDaysArray = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysCount = daysInMonth(year, month);
    const firstDay = firstDayOfMonth(year, month);
    const days = [];

    // Previous month's days
    const prevMonthLastDay = daysInMonth(year, month - 1);
    for (let i = 0; i < firstDay; i++) {
      const day = prevMonthLastDay - firstDay + i + 1;
      const date = new Date(year, month - 1, day);
      days.push({
        date,
        isCurrentMonth: false,
        dateString: date.toDateString()
      });
    }

    // Current month's days
    for (let i = 1; i <= daysCount; i++) {
      const date = new Date(year, month, i);
      days.push({
        date,
        isCurrentMonth: true,
        dateString: date.toDateString()
      });
    }

    // Next month's days to fill grid
    const totalCells = 42; // 6 weeks * 7 days
    const nextMonthDays = totalCells - days.length;
    for (let i = 1; i <= nextMonthDays; i++) {
      const date = new Date(year, month + 1, i);
      days.push({
        date,
        isCurrentMonth: false,
        dateString: date.toDateString()
      });
    }

    return days;
  };

  const handleAddTask = (dateString) => {
    if (!newTask.title.trim()) return;

    const taskId = Date.now();
    const task = {
      id: taskId,
      ...newTask,
      completed: false,
      date: dateString
    };

    setTasks(prev => ({
      ...prev,
      [dateString]: [...(prev[dateString] || []), task]
    }));

    setNewTask({
      title: '',
      description: '',
      priority: 'medium',
      time: '09:00'
    });
  };

  const handleDeleteTask = (dateString, taskId) => {
    setTasks(prev => ({
      ...prev,
      [dateString]: prev[dateString].filter(task => task.id !== taskId)
    }));
  };

  const handleToggleComplete = (dateString, taskId) => {
    setTasks(prev => ({
      ...prev,
      [dateString]: prev[dateString].map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    }));
  };

  const handleUpdateTask = (dateString, taskId, updates) => {
    setTasks(prev => ({
      ...prev,
      [dateString]: prev[dateString].map(task =>
        task.id === taskId ? { ...task, ...updates } : task
      )
    }));
  };

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const isToday = (date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
  };

  const days = getDaysArray();

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button onClick={prevMonth} className="nav-button">◀</button>
        <h1>{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h1>
        <button onClick={nextMonth} className="nav-button">▶</button>
      </div>

      <div className="task-input-section">
        <h3>Add New Task</h3>
        <div className="task-form">
          <input
            type="text"
            placeholder="Task title"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            className="task-input-field"
          />
          <textarea
            placeholder="Description"
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            className="task-textarea-field"
          />
          <div className="task-form-options">
            <select
              value={newTask.priority}
              onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
              className="priority-select"
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
            <input
              type="time"
              value={newTask.time}
              onChange={(e) => setNewTask({ ...newTask, time: e.target.value })}
              className="time-input"
            />
          </div>
          <p className="form-note">Select a date on calendar to add task</p>
        </div>
      </div>

      <div className="calendar-grid">
        {dayNames.map(day => (
          <div key={day} className="day-header">{day}</div>
        ))}
        
        {days.map((day, index) => {
          const dayTasks = tasks[day.dateString] || [];
          return (
            <div
              key={index}
              className={`day-cell ${day.isCurrentMonth ? 'current-month' : 'other-month'} ${isToday(day.date) ? 'today' : ''}`}
              onClick={() => {
                if (day.isCurrentMonth && newTask.title.trim()) {
                  handleAddTask(day.dateString);
                }
              }}
            >
              <div className="day-number">{day.date.getDate()}</div>
              <div className="day-tasks">
                {dayTasks.map(task => (
                  <Task
                    key={task.id}
                    task={task}
                    onDelete={() => handleDeleteTask(day.dateString, task.id)}
                    onToggleComplete={() => handleToggleComplete(day.dateString, task.id)}
                    onUpdate={(taskId, updates) => handleUpdateTask(day.dateString, taskId, updates)}
                  />
                ))}
              </div>
              {day.isCurrentMonth && newTask.title.trim() && (
                <div className="add-task-hint">Click to add: {newTask.title}</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;