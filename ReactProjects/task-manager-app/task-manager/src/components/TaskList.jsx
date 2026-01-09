import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, onDeleteTask, onUpdateTask }) => {
  if (tasks.length === 0) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '60px 20px'
      }}>
        <div style={{
          width: '80px',
          height: '80px',
          background: 'linear-gradient(135deg, var(--gray-light), white)',
          borderRadius: '50%',
          margin: '0 auto 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <span style={{ fontSize: '32px', color: 'var(--gray-medium)' }}>📝</span>
        </div>
        <h3 style={{ 
          fontSize: '22px',
          color: 'var(--gray-dark)',
          marginBottom: '10px'
        }}>
          No tasks yet
        </h3>
        <p style={{ color: 'var(--gray-medium)' }}>
          Create your first task to get started!
        </p>
      </div>
    );
  }

  const pendingTasks = tasks.filter(task => task.status !== 'completed');
  const completedTasks = tasks.filter(task => task.status === 'completed');

  return (
    <div>
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{
          fontSize: '22px',
          marginBottom: '20px',
          color: 'var(--dark-color)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <span style={{
            width: '28px',
            height: '28px',
            background: 'var(--warning-color)',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '14px'
          }}>
            {pendingTasks.length}
          </span>
          Active Tasks ({pendingTasks.length})
        </h2>
        <div className="grid" style={{ gap: '16px' }}>
          {pendingTasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onDelete={onDeleteTask}
              onUpdate={onUpdateTask}
            />
          ))}
        </div>
      </div>

      {completedTasks.length > 0 && (
        <div>
          <h2 style={{
            fontSize: '22px',
            marginBottom: '20px',
            color: 'var(--dark-color)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <span style={{
              width: '28px',
              height: '28px',
              background: 'var(--success-color)',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '14px'
            }}>
              {completedTasks.length}
            </span>
            Completed Tasks ({completedTasks.length})
          </h2>
          <div className="grid" style={{ gap: '16px' }}>
            {completedTasks.map(task => (
              <TaskItem
                key={task.id}
                task={task}
                onDelete={onDeleteTask}
                onUpdate={onUpdateTask}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;