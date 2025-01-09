export const API_URL = 'http://localhost:8000/api/v1';

export const ENDPOINTS = {
  // Clients
  education: {
    getAll: '/education',
    getById: '/education/:id',
    post: '/education',
    update: '/education/:id',
    delete: '/education/:id',
  },
  project:{
    getAll: '/project',
    getById: '/project/:id',
    post: '/project',
  }
}
