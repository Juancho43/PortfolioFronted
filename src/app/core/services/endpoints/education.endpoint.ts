export const educationEndpoint = {
  getAll:(page: string, limit: string)=> `/education/get/paginated/${page}/${limit}`,
  getById: '/education/:id',
  getByTag: '/education/tag/:tag',
  getBySlug: '/education/get/slug/:slug',
  post: '/education/private',
  update: '/education/private/:id',
  delete: '/education/private/:id',
};
