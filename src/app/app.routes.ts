import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { EducationPageComponent } from './sections/education-page/education-page.component';
import { ProyectsPageComponent } from './sections/proyects-page/proyects-page.component';
import { HomePageComponent } from './sections/home-page/home-page.component';
import { AboutPageComponent } from './sections/about-page/about-page.component';
import {AdminPageComponent} from "./sections/admin-page/admin-page.component";

export const routes: Routes = [
    { path: '', component: HomePageComponent },
    { path: 'education', component: EducationPageComponent },
    { path: 'proyects', component: ProyectsPageComponent },
    { path: 'about', component: AboutPageComponent },
    { path: 'admin', component: AdminPageComponent },
];
