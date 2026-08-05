import api from './axios';

export const login = (data) => api.post('/auth/login', data);
export const register = (data) => api.post('/auth/register', data);
export const verifyOtp = (data) => api.post('/auth/verify-email', data);
export const getProfile = () => api.get('/auth/profile');
export const logout = () => api.post('/auth/logout');