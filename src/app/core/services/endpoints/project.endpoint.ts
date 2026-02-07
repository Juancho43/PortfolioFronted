export const projectEndpoint = {
  getAll: (page: number, limit: number) => `/project/get/paginated/${page}/${limit}`,
  getById: '/project/:id',
  getByTag: '/project/tag/:tag',
  getByEducation: '/project/education/:slug',
  getBySlug: '/project/slug/:slug',
  post: '/project/private',
  update: '/project/private/:id',
  delete: '/project/private/:id',
  search: '/project/search',
};
