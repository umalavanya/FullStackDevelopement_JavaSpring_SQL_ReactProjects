import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState('light');
  const [font, setFont] = useState('Arial');

  const login = (username, password) => {
    // Simple mock authentication
    if (username && password) {
      setUser({ username });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const changeFont = (newFont) => {
    setFont(newFont);
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      theme,
      toggleTheme,
      font,
      changeFont
    }}>
      {children}
    </AuthContext.Provider>
  );
};