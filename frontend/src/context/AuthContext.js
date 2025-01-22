import React, { createContext, useState, useEffect } from 'react'; // Import necessary React hooks and createContext for global state
import API from '../api/api'; // Import API helper for making backend requests

// Create the authentication context, allowing access to user data across the app
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Initialize user state as null (logged out by default)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve JWT token from localStorage
        if (token) {
          const { data } = await API.get('/auth/me'); // Fetch user details from the backend
          setUser(data); // Update user state with fetched user data
        }
      } catch (error) {
        console.log(error); // Log errors if request fails
      }
    };
    fetchUser(); // Call fetchUser function when component mounts
  }, []); // Empty dependency array ensures this runs only once

  const login = async (email, password) => {
    try {
      const { data } = await API.post('/auth/login', { email, password }); // Send login request to backend
      localStorage.setItem('token', data.token); // Save JWT token in localStorage for persistence
      setUser(data.user); // Update user state with logged-in user's data
    } catch (error) {
      console.error(error.response.data); // Log error if login fails
    }
  };

  const logout = () => {
    localStorage.removeItem('token'); // Remove JWT token from localStorage
    setUser(null); // Clear user state (log the user out)
  };

  return (
    // Provide authentication state and functions to all children components
    <AuthContext.Provider value={{ user, login, logout }}>
      {children} {/* Render children components inside AuthProvider */}
    </AuthContext.Provider>
  );
};

export default AuthProvider; // Export AuthProvider to wrap the app and provide authentication context

