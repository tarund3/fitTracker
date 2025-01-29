import React, { createContext, useState, useEffect } from 'react';
import API from '../api/api'; // <-- Import the Axios instance

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log('🔹 Auth Token in localStorage:', token);
    
        if (token) {
          const response = await API.get('/auth/me');
          console.log('✅ Fetch User Response:', response.data);
          setUser(response.data);
        }
      } catch (error) {
        console.error('❌ Error fetching user:', error.response ? error.response.data : error.message);
      }
    };
    
    fetchUser();
  }, []);

  const login = async (email, password) => {
    try {
        const { data } = await API.post('/auth/login', { email, password });
        console.log("🛠 Login API Response:", data); // Log the response

        if (data.token) {
            localStorage.setItem('token', data.token);
            console.log("✅ Token stored in localStorage:", data.token);
            setUser(data.user);
        } else {
            console.error("🚨 No token received in login response!");
        }
    } catch (error) {
        console.error('🚨 Login error:', error.response ? error.response.data : error);
    }
  };

  

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
