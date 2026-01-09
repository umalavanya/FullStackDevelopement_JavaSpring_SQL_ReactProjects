import React from 'react';
import { useDragAndDrop } from './DragAndDropContext';

const TaskItem = ({ task, onDelete, onUpdate }) => {
  const { handleDragStart, handleDragEnd, handleDragOver, handleDrop, dragOverStatus } = useDragAndDrop();
  
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'priority-high';
      case 'medium': return 'priority-medium';
      case 'low': return 'priority-low';
      default: return '';
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'pending': return 'status-pending';
      case 'in-progress': return 'status-in-progress';
      case 'completed': return 'status-completed';
      default: return '';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending': return 'Pending';
      case 'in-progress': return 'In Progress';
      case 'completed': return 'Completed';
      default: return status;
    }
  };

  const handleStatusChange = (e) => {
    onUpdate(task.id, { status: e.target.value });
  };

  return (
    <div 
      className="glass-card" 
      style={{
        padding: '24px',
        animation: 'slideIn 0.3s ease',
        transition: 'all 0.3s ease',
        cursor: 'move',
        border: dragOverStatus === task.status ? '2px dashed var(--primary-color)' : '1px solid rgba(255, 255, 255, 0.2)',
        transform: dragOverStatus === task.status ? 'scale(1.02)' : 'scale(1)',
        ':hover': {
          transform: 'translateY(-4px)',
          boxShadow: 'var(--shadow-lg)'
        }
      }}
      draggable
      onDragStart={(e) => handleDragStart(e, task)}
      onDragEnd={handleDragEnd}
      onDragOver={(e) => handleDragOver(e, task.status)}
      onDrop={(e) => handleDrop(e, task.status, onUpdate)}
    >
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '15px'
      }}>
        <div style={{ flex: 1 }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '10px'
          }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '600',
              color: 'var(--dark-color)'
            }}>
              {task.title}
            </h3>
            <span className={`status-badge ${getStatusClass(task.status)}`}>
              {getStatusText(task.status)}
            </span>
          </div>
          
          <p style={{
            color: 'var(--gray-dark)',
            marginBottom: '15px',
            lineHeight: '1.5'
          }}>
            {task.description}
          </p>

          <div style={{
            display: 'flex',
            gap: '20px',
            flexWrap: 'wrap'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: 'var(--gray-medium)'
            }}>
              <span style={{ fontSize: '14px' }}>⏰</span>
              <span>{task.timeToComplete || 'No time set'}</span>
            </div>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: 'var(--gray-medium)'
            }}>
              <span style={{ fontSize: '14px' }}>🏷️</span>
              <span className={getPriorityColor(task.priority)}>
                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
              </span>
            </div>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: 'var(--gray-medium)'
            }}>
              <span style={{ fontSize: '14px' }}>👤</span>
              <span>{task.assignedTo || 'Unassigned'}</span>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: 'var(--gray-medium)',
              fontSize: '12px'
            }}>
              <span>📅</span>
              <span>{new Date(task.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        <div style={{
          display: 'flex',
          gap: '8px'
        }}>
          <select
            value={task.status}
            onChange={handleStatusChange}
            className="form-control"
            style={{ 
              width: 'auto',
              padding: '8px 12px',
              fontSize: '14px'
            }}
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          
          <button
            onClick={() => onDelete(task.id)}
            className="btn btn-danger"
            style={{ padding: '8px 16px', fontSize: '14px' }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;