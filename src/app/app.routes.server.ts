import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'education',
    renderMode: RenderMode.Server
  },
  {
    path: 'education/:tag',
    renderMode: RenderMode.Server
  },
  {
    path: 'education/current/:slug',
    renderMode: RenderMode.Server
  },
  {
    path: 'projects',
    renderMode: RenderMode.Server
  },
  {
    path: 'projects/:tag',
    renderMode: RenderMode.Server
  },
  {
    path: 'projects/current/:slug',
    renderMode: RenderMode.Server
  },
  {
    path: 'home',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'contact',
    renderMode: RenderMode.Prerender
  },
  // Authentication routes
  {
    path: 'login',
    renderMode: RenderMode.Client
  },
  {
    path: 'logout',
    renderMode: RenderMode.Client
  },
  {
    path: 'password-reset',
    renderMode: RenderMode.Client
  },
  // Admin routes
  {
    path: 'admin',
    renderMode: RenderMode.Client
  },
  {
    path: 'admin/profile',
    renderMode: RenderMode.Client
  },
  {
    path: 'admin/education',
    renderMode: RenderMode.Client
  },
  {
    path: 'admin/project',
    renderMode: RenderMode.Client
  },
  {
    path: 'admin/tags',
    renderMode: RenderMode.Client
  },
  {
    path: 'admin/links',
    renderMode: RenderMode.Client
  },
  // Not found page
  {
    path: 'not-found',
    renderMode: RenderMode.Prerender
  }

];
