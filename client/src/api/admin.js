import api from './axios';

export const adminAPI = {
  getDashboardStats: () => api.get('/admin/dashboard'),
  getAllUsers: () => api.get('/admin/users'),
};

