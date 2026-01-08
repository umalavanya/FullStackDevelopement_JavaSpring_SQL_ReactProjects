import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('sqlLearnerUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('sqlLearnerUser'));

  useEffect(() => {
    if (user) {
      localStorage.setItem('sqlLearnerUser', JSON.stringify(user));
      setIsAuthenticated(true);
    } else {
      localStorage.removeItem('sqlLearnerUser');
      setIsAuthenticated(false);
    }
  }, [user]);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const updateUserProgress = (progressData) => {
    if (user) {
      setUser(prev => ({
        ...prev,
        progress: { ...prev.progress, ...progressData }
      }));
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      login,
      logout,
      updateUserProgress
    }}>
      {children}
    </AuthContext.Provider>
  );
};