import { Component } from '@angular/core';
import {ProyectFormComponent} from "../../modules/proyects/proyect-form/proyect-form.component";
import {TagFormComponent} from "../../modules/tags/tag-form/tag-form.component";

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [
    ProyectFormComponent,
    TagFormComponent
  ],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.css'
})
export class AdminPageComponent {

}
