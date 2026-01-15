import React, { useState } from 'react';
import './Task.css';

const Task = ({ task, onDelete, onToggleComplete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description);

  const handleSave = () => {
    onUpdate(task.id, { title: editedTitle, description: editedDescription });
    setIsEditing(false);
  };

  const priorityColors = {
    high: '#ff3860',
    medium: '#ffdd57',
    low: '#23d160'
  };

  return (
    <div className={`task-box ${task.completed ? 'completed' : ''}`}>
      {isEditing ? (
        <div className="task-edit">
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="task-input"
          />
          <textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            className="task-textarea"
          />
          <div className="task-edit-actions">
            <button onClick={handleSave} className="save-btn">Save</button>
            <button onClick={() => setIsEditing(false)} className="cancel-btn">Cancel</button>
          </div>
        </div>
      ) : (
        <>
          <div className="task-header">
            <div className="task-title-section">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => onToggleComplete(task.id)}
                className="task-checkbox"
              />
              <h3 className="task-title">{task.title}</h3>
            </div>
            <div className="task-priority" style={{ backgroundColor: priorityColors[task.priority] }}>
              {task.priority}
            </div>
          </div>
          <p className="task-description">{task.description}</p>
          <div className="task-footer">
            <span className="task-time">{task.time}</span>
            <div className="task-actions">
              <button onClick={() => setIsEditing(true)} className="edit-btn">Edit</button>
              <button onClick={() => onDelete(task.id)} className="delete-btn">Delete</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Task;