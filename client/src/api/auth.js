import api from './axios';

export const authAPI = {
  sendOTP: (email) => api.post('/auth/send-otp', { email }),
  verifyOTP: (email, otp) => api.post('/auth/verify-otp', { email, otp }),
  getCurrentUser: () => api.get('/auth/me'),
  logout: () => api.post('/auth/logout'),
  acceptPolicy: (type) => api.post('/auth/accept-policy', { type }),
};

