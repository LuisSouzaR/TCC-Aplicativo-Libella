import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLogged, setIsLogged] = useState(false);
  const [userType, setUserType] = useState(null);

  const login = (userData) => {
    setUser(userData);
  };

  const logged = () => {
    setIsLogged(true);
  };

  const loggedOut = () => {
    setIsLogged(false);
  };

  const logout = () => {
    setUser(null);
    setIsLogged(false)
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLogged, logged, loggedOut, setUserType, userType}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};