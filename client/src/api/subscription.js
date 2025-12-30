import api from './axios';

export const subscriptionAPI = {
  getPlans: () => api.get('/subscription/plans'),
  createSubscription: (planType) => api.post('/subscription/create', { planType }),
  verifySubscription: (orderId, paymentId, planType) =>
    api.post('/subscription/verify', { subscriptionId: orderId, paymentId, planType }),
  getCurrentSubscription: () => api.get('/subscription/current'),
  cancelSubscription: () => api.post('/subscription/cancel'),
};

