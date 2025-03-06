'use client';

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Use state to track if the component has mounted on the client
  const [isMounted, setIsMounted] = useState(false);

  // State for login status
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true'); // Persist the login state
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.setItem('isLoggedIn', 'false'); // Persist the logout state
  };

  useEffect(() => {
    // Ensure code runs only on the client-side
    if (typeof window !== 'undefined') {
      setIsMounted(true);
      // Try to read the logged-in state from localStorage
      const storedIsLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
      setIsLoggedIn(storedIsLoggedIn);
    }
  }, []);

  if (!isMounted) {
    return null; // Render nothing until the component has mounted on the client
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
