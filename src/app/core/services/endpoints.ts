export const API_URL = 'http://localhost:8000/api/v1';

export const ENDPOINTS = {
  profile:{
    get:'/profile/:id'
  },
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
    getByTag: '/project/tag/:id'
  },
  tag:{
    getAll: '/tag',
  }
}
