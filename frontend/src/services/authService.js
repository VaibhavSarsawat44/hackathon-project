import api from './api';

// Signup
export const signup = async (name, email, password) => {
  const res = await api.post('/auth/signup', { name, email, password });
  return res.data;
};

// Login
export const login = async (email, password) => {
  const res = await api.post('/auth/login', { email, password });
  return res.data;
};

// Save token + user to localStorage
export const saveAuth = (token, user) => {
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
};

// Get current user from localStorage
export const getUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

// Get token
export const getToken = () => localStorage.getItem('token');

// Check if logged in
export const isLoggedIn = () => !!localStorage.getItem('token');

// Logout
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = '/login';
};
