import React, { useState, useEffect } from 'react';
import { useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Login from './components/Login';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { storage } from './utils/storage';
import './styles/App.css';

function App() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [searchTerm, setSearchTerm] = useState('');



  // Load tasks from localStorage on initial render
  useEffect(() => {
    const savedTasks = storage.loadTasks();
    if (savedTasks.length > 0) {
      setTasks(savedTasks);
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    if (tasks.length > 0 || tasks.length === 0) {
      storage.saveTasks(tasks);
    }
  }, [tasks]);

  const handleAddTask = (newTask) => {
    setTasks(prev => [newTask, ...prev]);
  };

  const handleDeleteTask = (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTasks(prev => prev.filter(task => task.id !== taskId));
    }
  };

  const handleUpdateTask = (taskId, updates) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, ...updates } : task
    ));
  };

  // Filter tasks based on selected filter
  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'pending') return task.status === 'pending';
    if (filter === 'in-progress') return task.status === 'in-progress';
    if (filter === 'completed') return task.status === 'completed';
    if (filter === 'high') return task.priority === 'high';
    if (filter === 'medium') return task.priority === 'medium';
    if (filter === 'low') return task.priority === 'low';
    return true;
  });

  // Sort tasks
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === 'newest') {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
    if (sortBy === 'oldest') {
      return new Date(a.createdAt) - new Date(b.createdAt);
    }
    if (sortBy === 'priority') {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    }
    return 0;
  });

  // Calculate statistics
  const stats = {
    total: tasks.length,
    pending: tasks.filter(t => t.status === 'pending').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    completed: tasks.filter(t => t.status === 'completed').length,
  };

  // Update the filteredTasks calculation
const filteredTasks = tasks.filter(task => {
  // Search filter
  const matchesSearch = searchTerm === '' || 
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.assignedTo.toLowerCase().includes(searchTerm.toLowerCase());
  
  if (!matchesSearch) return false;
  
  // Status/Priority filter
  if (filter === 'all') return true;
  if (filter === 'pending') return task.status === 'pending';
  if (filter === 'in-progress') return task.status === 'in-progress';
  if (filter === 'completed') return task.status === 'completed';
  if (filter === 'high') return task.priority === 'high';
  if (filter === 'medium') return task.priority === 'medium';
  if (filter === 'low') return task.priority === 'low';
  return true;
});

  return (
    <div className="App">
      <Navbar />
      
      {!user ? (
        <Login />
      ) : (
        <div className="container">
          <div className="page-container">
            {/* Dashboard Header */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginBottom: '40px',
              flexWrap: 'wrap',
              gap: '20px'
            }}>
              <div>
                <h1 style={{
                  fontSize: '32px',
                  marginBottom: '8px',
                  background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontWeight: 'bold'
                }}>
                  Task Dashboard
                </h1>
                <p style={{ color: 'var(--gray-medium)' }}>
                  Manage your tasks efficiently and effectively
                </p>
              </div>
              
              {/* Stats Cards */}
              <div style={{
                display: 'flex',
                gap: '15px',
                flexWrap: 'wrap'
              }}>
                {Object.entries(stats).map(([key, value]) => (
                  <div key={key} className="glass-card" style={{
                    padding: '15px 20px',
                    textAlign: 'center',
                    minWidth: '100px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onClick={() => setFilter(key === 'total' ? 'all' : key === 'inProgress' ? 'in-progress' : key)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                  }}>
                    <div style={{
                      fontSize: '28px',
                      fontWeight: 'bold',
                      color: key === 'completed' ? 'var(--success-color)' : 
                             key === 'inProgress' ? 'var(--primary-color)' : 
                             key === 'pending' ? 'var(--warning-color)' : 'var(--dark-color)'
                    }}>
                      {value}
                    </div>
                    <div style={{
                      textTransform: 'capitalize',
                      color: 'var(--gray-medium)',
                      fontSize: '14px',
                      fontWeight: '600'
                    }}>
                      {key.replace(/([A-Z])/g, ' $1')}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Controls */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '30px',
              flexWrap: 'wrap',
              gap: '15px'
            }}>
              <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                <div style={{ position: 'relative' }}>
      <input
        type="text"
        placeholder="Search tasks..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="form-control"
        style={{ 
          paddingLeft: '40px',
          width: '250px',
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%23a0aec0' viewBox='0 0 16 16'%3E%3Cpath d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: '15px center',
          backgroundSize: '16px'
        }}
      />
      {searchTerm && (
        <button
          onClick={() => setSearchTerm('')}
          style={{
            position: 'absolute',
            right: '10px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'none',
            border: 'none',
            color: 'var(--gray-medium)',
            cursor: 'pointer',
            fontSize: '18px'
          }}
        >
          ×
        </button>
      )}
    </div>
                
                
                
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="form-control"
                  style={{ width: 'auto', minWidth: '150px' }}
                >
                  <option value="all">All Tasks</option>
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="high">High Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="low">Low Priority</option>
                </select>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="form-control"
                  style={{ width: 'auto', minWidth: '150px' }}
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="priority">Priority</option>
                </select>
              </div>

              <div style={{ color: 'var(--gray-medium)' }}>
                Showing {sortedTasks.length} of {tasks.length} tasks
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-2" style={{ gap: '30px' }}>
              <div>
                <TaskForm onSubmit={handleAddTask} />
              </div>
              <div>
                <TaskList 
                  tasks={sortedTasks}
                  onDeleteTask={handleDeleteTask}
                  onUpdateTask={handleUpdateTask}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;