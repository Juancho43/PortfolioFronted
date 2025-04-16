import { Routes } from '@angular/router';
import { EducationPageComponent } from './sections/education-page/education-page.component';
import { HomePageComponent } from './sections/home-page/home-page.component';
import { AdminPageComponent } from './sections/admin-page/admin-page.component';
import { ContactPageComponent } from './sections/contact-page/contact-page.component';
import { EducationPanelComponent } from '@modules/education/education-panel/education-panel.component';
import { ProjectsPageComponent } from './sections/projects-page/projects-page.component';
import { ProfilePanelComponent } from '@modules/profile/profile-panel/profile-panel.component';
import { ProjectPanelComponent } from '@modules/projects/project-panel/project-panel.component';
import { TagsPanelComponent } from '@modules/tags/tags-panel/tags-panel.component';
import { LoginFormComponent } from '@modules/auth/login-form/login-form.component';
import { authGuard } from '@core/guards/auth.guard';

import { ProjectComponent } from '@modules/projects/project/project.component';
import { EducationComponent } from '@modules/education/education/education.component';
import { ProjectListComponent } from '@modules/projects/project-list/project-list.component';

export const routes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: 'education', component: EducationPageComponent },
  { path: 'education/by/:tag', component: EducationPageComponent },
  { path: 'education/:slug', component: EducationComponent },
  {
    path: 'projects',
    component: ProjectsPageComponent,
    children: [
      { path: 'all', component: ProjectListComponent },
      { path: 'by/:tag', component: ProjectListComponent },
    ],
  },
  { path: 'project/:slug', component: ProjectComponent },
  { path: 'contact', component: ContactPageComponent },
  { path: 'login', component: LoginFormComponent },
  {
    path: 'admin',
    component: AdminPageComponent,
    canActivate: [authGuard],
    children: [
      { path: 'profile', component: ProfilePanelComponent },
      { path: 'education', component: EducationPanelComponent },
      { path: 'project', component: ProjectPanelComponent },
      { path: 'tag', component: TagsPanelComponent },
    ],
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: ContactPageComponent },
];
