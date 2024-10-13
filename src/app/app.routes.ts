import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { EducationPageComponent } from './sections/education-page/education-page.component';
import { ProyectsPageComponent } from './sections/proyects-page/proyects-page.component';
import { HomePageComponent } from './sections/home-page/home-page.component';

export const routes: Routes = [
    { path: '', component: HomePageComponent },
    { path: 'education', component: EducationPageComponent },
    { path: 'proyects', component: ProyectsPageComponent },
    { path: 'about', component: ProyectsPageComponent },
];
