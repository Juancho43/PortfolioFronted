import { Routes } from '@angular/router';
import { authGuard } from '@core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./sections/home-page/home-page.component').then(),
  },
  {
    path: 'education',
    loadComponent: () => import('./sections/education-page/education-page.component').then(),
    children: [
      {
        path: ':tag',
        loadComponent: () => import('./modules/education/education-list/education-list.component').then(),
      },
      {
        path: 'current/:slug',
        loadComponent: () => import('./modules/education/education-detail/education-detail.component').then(),
      },
    ],
  },

  {
    path: 'projects',
    loadComponent: () => import('./sections/projects-page/projects-page.component').then(),
    children: [
      {
        path: ':tag',
        loadComponent: () => import('./modules/projects/project-list/project-list.component').then(),
      },
      {
        loadComponent: () => import('@modules/projects/project/project-detail.component').then(),
        path: 'current/:slug',
      },
    ],
  },
  {
    path: 'contact',
    loadComponent: () => import('./sections/contact-page/contact-page.component').then(),
  },
  {
    path: 'login',
    loadComponent: () => import('./modules/auth/login-form/login-form.component').then(),
  },
  {
    path: 'logout',
    canActivate: [authGuard],
    loadComponent: () => import('./modules/auth/logout-form/logout-form.component').then(),
  },
  {
    path: 'password-reset',
    canActivate: [authGuard],
    loadComponent: () => import('./modules/auth/password-reset-form/password-reset-form.component').then(),
  },
  {
    path: 'admin',
    loadComponent: () => import('./sections/admin-page/admin-page.component').then(),
    canActivate: [authGuard],
    children: [
      {
        path: 'profile',
        loadComponent: () => import('./modules/profile/profile-panel/profile-panel.component').then(),
      },
      {
        path: 'education',
        loadComponent: () => import('./modules/education/education-panel/education-panel.component').then(),
      },
      {
        path: 'project',
        loadComponent: () => import('./modules/projects/project-panel/project-panel.component').then(),
      },
      {
        path: 'tags',
        loadComponent: () => import('./modules/tags/tags-panel/tags-panel.component').then(),
      },
      {
        path: 'links',
        loadComponent: () => import('./modules/links/link-panel/link-panel.component').then(),
      },
      // {
      //   path: 'work',
      //   loadComponent: () => import('./modules/tags/tags-panel/tags-panel.component').then(),
      // },
    ],
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: '/not-found' },
  {
    path: 'not-found',
    loadComponent: () => import('./sections/not-found/not-found.component').then(),
  },
];
