import { Component } from '@angular/core';
import {ProyectFormComponent} from "../../modules/proyects/proyect-form/proyect-form.component";
import {TagFormComponent} from "../../modules/tags/tag-form/tag-form.component";
import {EducationFormComponent} from "../../modules/education/education-form/education-form.component";
import {ProfileFormComponent} from "../../modules/profile/profile-form/profile-form.component";

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [
    ProyectFormComponent,
    TagFormComponent,
    EducationFormComponent,
    ProfileFormComponent
  ],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.css'
})
export class AdminPageComponent {

}
