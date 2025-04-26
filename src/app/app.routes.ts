import { Routes } from '@angular/router';
import { authGuard } from '@core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./sections/home-page/home-page.component').then(
        (c) => c.HomePageComponent,
      ),
  },
  {
    path: 'education',
    loadComponent: () =>
      import('./sections/education-page/education-page.component').then(
        (c) => c.EducationPageComponent,
      ),
    children: [
      {
        path: ':tag',
        loadComponent: () =>
          import(
            './modules/education/education-list/education-list.component'
          ).then((c) => c.EducationListComponent),
      },
      {
        path: 'current/:slug',
        loadComponent: () =>
          import('./modules/education/education/education.component').then(
            (c) => c.EducationComponent,
          ),
      },
    ],
  },

  {
    path: 'projects',
    loadComponent: () =>
      import('./sections/projects-page/projects-page.component').then(
        (c) => c.ProjectsPageComponent,
      ),
    children: [
      {
        path: ':tag',
        loadComponent: () =>
          import('./modules/projects/project-list/project-list.component').then(
            (c) => c.ProjectListComponent,
          ),
      },
      {
        loadComponent: () =>
          import('./modules/projects/project/project.component').then(
            (c) => c.ProjectComponent,
          ),
        path: 'current/:slug',
      },
    ],
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./sections/contact-page/contact-page.component').then(
        (c) => c.ContactPageComponent,
      ),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./modules/auth/login-form/login-form.component').then(
        (c) => c.LoginFormComponent,
      ),
  },
  {
    path: 'admin',
    loadComponent: () =>
      import('./sections/admin-page/admin-page.component').then(
        (c) => c.AdminPageComponent,
      ),
    canActivate: [authGuard],
    children: [
      {
        path: 'profile',
        loadComponent: () =>
          import(
            './modules/profile/profile-panel/profile-panel.component'
          ).then((c) => c.ProfilePanelComponent),
      },
      {
        path: 'education',
        loadComponent: () =>
          import(
            './modules/education/education-panel/education-panel.component'
          ).then((c) => c.EducationPanelComponent),
      },
      {
        path: 'project',
        loadComponent: () =>
          import(
            './modules/projects/project-panel/project-panel.component'
          ).then((c) => c.ProjectPanelComponent),
      },
      {
        path: 'tag',
        loadComponent: () =>
          import('./modules/tags/tags-panel/tags-panel.component').then(
            (c) => c.TagsPanelComponent,
          ),
      },
    ],
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'not-found',
    loadComponent: () =>
      import('./sections/not-found/not-found.component').then(
        (c) => c.NotFoundComponent,
      ),
  },
  { path: '**', redirectTo: '/not-found' },
];
