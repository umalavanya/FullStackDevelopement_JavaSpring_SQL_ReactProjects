import React, { useState } from 'react';

const TaskForm = ({ onSubmit }) => {
  const [task, setTask] = useState({
    title: '',
    description: '',
    timeToComplete: '',
    priority: 'medium',
    status: 'pending',
    assignedTo: ''
  });

  const teamMembers = ['John Doe', 'Jane Smith', 'Mike Johnson', 'Sarah Wilson', 'Alex Chen'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.title.trim()) {
      const newTask = {
        ...task,
        id: Date.now(),
        createdAt: new Date().toISOString()
      };
      onSubmit(newTask);
      setTask({
        title: '',
        description: '',
        timeToComplete: '',
        priority: 'medium',
        status: 'pending',
        assignedTo: ''
      });
    }
  };

  

  return (
    <div className="glass-card" style={{ padding: '30px' }}>
      <h2 style={{
        fontSize: '24px',
        marginBottom: '25px',
        color: 'var(--dark-color)',
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
      }}>
        <span style={{
          width: '32px',
          height: '32px',
          background: 'var(--gradient-primary)',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '16px'
        }}>+</span>
        Create New Task
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-2">
          <div className="form-group">
            <label htmlFor="title">Task Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              className="form-control"
              value={task.title}
              onChange={handleChange}
              placeholder="Enter task title"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="timeToComplete">Time to Complete</label>
            <input
              type="text"
              id="timeToComplete"
              name="timeToComplete"
              className="form-control"
              value={task.timeToComplete}
              onChange={handleChange}
              placeholder="e.g., 2 hours, 3 days"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            className="form-control"
            value={task.description}
            onChange={handleChange}
            placeholder="Task details..."
            rows="3"
            style={{ resize: 'vertical' }}
          />
        </div>

        <div className="grid grid-2">
          <div className="form-group">
            <label htmlFor="priority">Priority</label>
            <select
              id="priority"
              name="priority"
              className="form-control"
              value={task.priority}
              onChange={handleChange}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="assignedTo">Assign To</label>
            <select
              id="assignedTo"
              name="assignedTo"
              className="form-control"
              value={task.assignedTo}
              onChange={handleChange}
            >
              <option value="">Unassigned</option>
              {teamMembers.map(member => (
                <option key={member} value={member}>{member}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            className="form-control"
            value={task.status}
            onChange={handleChange}
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          style={{ width: '100%', marginTop: '10px' }}
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

export default TaskForm;