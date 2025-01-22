import axios from 'axios';

const API = axios.create({
  baseURL: '/api', // Uses the proxy
  headers: { 'Content-Type': 'application/json' },
});

// Attach JWT token to requests if logged in
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;
