import React, { useState, createContext, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("userData");
    if (token) {
      setUser(token);
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("userData", userData);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("userData");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
