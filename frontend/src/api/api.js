import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5002/api' });

// Attach JWT token (if present) to Authorization header
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  console.log("🔄 Attaching Token to Request:", token);
  
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
    console.log("✅ Token attached:", req.headers.Authorization);
  } else {
    console.log("🚨 No token found in localStorage!");
  }
  
  return req;
});

export default API;
