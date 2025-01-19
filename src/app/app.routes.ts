import { Routes } from '@angular/router';
import { EducationPageComponent } from './sections/education-page/education-page.component';
import { ProyectsPageComponent } from './sections/proyects-page/proyects-page.component';
import { HomePageComponent } from './sections/home-page/home-page.component';
import { AdminPageComponent } from './sections/admin-page/admin-page.component';
import { ContactPageComponent } from './sections/contact-page/contact-page.component';
import { EducationPanelComponent } from './modules/education/education-panel/education-panel.component';
import { ProfilePanelComponent } from './modules/profile/profile-panel/profile-panel.component';
import { ProjectPanelComponent } from './modules/proyects/project-panel/project-panel.component';
import { TagsPanelComponent } from './modules/tags/tags-panel/tags-panel.component';
import { LoginFormComponent } from './modules/auth/login-form/login-form.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: 'home', component: ContactPageComponent },
  { path: 'education', component: EducationPageComponent },
  { path: 'projects', component: ProyectsPageComponent },
  { path: 'about', component: HomePageComponent },
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
