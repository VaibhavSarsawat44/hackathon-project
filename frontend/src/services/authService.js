import api from './api';

export const signup = async (name, email, password) => {
  const res = await api.post('/auth/signup', { name, email, password });
  return res.data;
};

export const login = async (email, password) => {
  const res = await api.post('/auth/login', { email, password });
  return res.data;
};

export const saveAuth = (token, user) => {
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = '/';
};

export const getUser = () => {
  try { return JSON.parse(localStorage.getItem('user')); } catch { return null; }
};

export const isLoggedIn = () => !!localStorage.getItem('token');
