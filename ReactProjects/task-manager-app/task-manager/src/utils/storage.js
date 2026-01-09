// Utility for localStorage operations
export const storage = {
  // Save tasks to localStorage
  saveTasks: (tasks) => {
    try {
      localStorage.setItem('tasks', JSON.stringify(tasks));
      return true;
    } catch (error) {
      console.error('Error saving tasks:', error);
      return false;
    }
  },

  // Load tasks from localStorage
  loadTasks: () => {
    try {
      const tasks = localStorage.getItem('tasks');
      return tasks ? JSON.parse(tasks) : [];
    } catch (error) {
      console.error('Error loading tasks:', error);
      return [];
    }
  },

  // Save user to localStorage
  saveUser: (user) => {
    try {
      localStorage.setItem('user', JSON.stringify(user));
      return true;
    } catch (error) {
      console.error('Error saving user:', error);
      return false;
    }
  },

  // Load user from localStorage
  loadUser: () => {
    try {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error('Error loading user:', error);
      return null;
    }
  }
};