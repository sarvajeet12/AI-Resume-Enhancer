import api from './axios';

export const resumeAPI = {
  uploadResume: (formData) => api.post('/resume/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  getAllResumes: () => api.get('/resume'),
  getResume: (id) => api.get(`/resume/${id}`),
  deleteResume: (id) => api.delete(`/resume/${id}`),
};

