import React, { createContext, useContext, useState, useEffect } from 'react';
import { API_CONFIG } from '../config/api';
import { testApiConnection } from '../utils/apiTest';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      console.log('Checking authentication status...');
      
      // Run API test in development mode
      if (import.meta.env.DEV) {
        await testApiConnection();
      }
      
      const response = await API_CONFIG.CLIENT.get(API_CONFIG.ENDPOINTS.CHECK_AUTH);
      
      console.log('Auth check response:', response.data);
      
      if (response.data.user) {
        setUser(response.data.user);
        setIsAuthenticated(true);
        console.log('User authenticated:', response.data.user);
      } else {
        setUser(null);
        setIsAuthenticated(false);
        console.log('No user data in response');
      }
    } catch (error) {
      console.log('Auth check failed:', error.response?.status, error.response?.data);
      
      // Handle specific error cases
      if (error.response?.status === 401) {
        console.log('User not authenticated (401) - this is normal for new users');
        // This is expected for users who haven't logged in yet
      } else if (error.response?.status === 403) {
        console.log('Access forbidden (403)');
      } else if (!error.response) {
        console.log('Network error or server not responding');
      }
      
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    console.log('User logged in:', userData);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    console.log('User logged out');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
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