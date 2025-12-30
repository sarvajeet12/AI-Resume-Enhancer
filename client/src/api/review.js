import api from './axios';

export const reviewAPI = {
  createReview: (data) => api.post('/review', data),
  getReviews: (params) => api.get('/review', { params }),
  getReviewStats: () => api.get('/review/stats'),
  getUserReview: () => api.get('/review/my-review'),
};

