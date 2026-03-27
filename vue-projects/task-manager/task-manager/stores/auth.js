import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null,
    user: null,
  }),
  
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  
  actions: {
    async register(userData) {
      try {
        const response = await $fetch('/api/register', {
          method: 'POST',
          body: userData
        });
        
        if (response.success) {
          alert('✅ Registration successful! Please login.');
          return true;
        } else {
          alert('❌ ' + response.message);
          return false;
        }
      } catch (error) {
        console.error('Registration error:', error);
        alert('❌ Registration failed. Please try again.');
        return false;
      }
    },
    
    async login(credentials) {
      try {
        const response = await $fetch('/api/login', {
          method: 'POST',
          body: credentials
        });
        
        if (response.success) {
          this.token = response.data.token;
          this.user = response.data.user;
          
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('user', JSON.stringify(response.data.user));
          
          alert('✅ Login successful!');
          return true;
        } else {
          alert('❌ ' + response.message);
          return false;
        }
      } catch (error) {
        console.error('Login error:', error);
        alert('❌ Login failed. Please check your credentials.');
        return false;
      }
    },
    
    logout() {
      this.token = null;
      this.user = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      alert('👋 Logged out successfully');
    },
    
    checkAuth() {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');
      
      if (token && user) {
        this.token = token;
        this.user = JSON.parse(user);
        return true;
      }
      return false;
    }
  }
});