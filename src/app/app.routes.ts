import { Routes } from '@angular/router';
import { EducationPageComponent } from './sections/education-page/education-page.component';
import { ProyectsPageComponent } from './sections/proyects-page/proyects-page.component';
import {HomePageComponent} from "./sections/home-page/home-page.component";
import {AdminPageComponent} from "./sections/admin-page/admin-page.component";
import {ContactPageComponent} from "./sections/contact-page/contact-page.component";

export const routes: Routes = [
    { path: 'home', component: ContactPageComponent },
    { path: 'education', component: EducationPageComponent },
    { path: 'proyects', component: ProyectsPageComponent },
    { path: 'about', component: HomePageComponent },
    { path: 'admin', component: AdminPageComponent },
    {path: '', redirectTo: 'home' , pathMatch: 'full'},
    {path: '**' , component : ContactPageComponent},
];
