import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // New loading state

  const checkUser = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('/api/user/check-auth', { withCredentials: true }).then(res => {

        if (res.data.authenticated) {
          setUser(res.data.user.id)
          localStorage.setItem("USERid", res.data.user.id);
          localStorage.setItem("USER", res.data.authenticated);

        }
      })
    } catch (error) {
      console.error('Authentication check failed', error);
    }
    finally {
      setIsLoading(false); // Set loading to false after check is complete
    }
  };

  const logout = async () => {
    try {
      console.log("async logout")
      await axios.post('api/user/logout', {}, { withCredentials: true }); // Tell the server to clear the session
      setUser(null); // Clear the user state
      localStorage.removeItem("USERid"); 
      localStorage.removeItem("USER");
      
    } catch (error) {
      console.error('Logout failed', error);
    }
  };


  useEffect(() => {
    checkUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, checkUser, isLoading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
