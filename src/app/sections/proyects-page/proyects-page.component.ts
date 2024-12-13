import { Component } from '@angular/core';
import {ProyectListComponent} from "../../modules/proyects/proyect-list/proyect-list.component";
import {TagFormComponent} from "../../modules/tags/tag-form/tag-form.component";
import {TagListComponent} from "../../modules/tags/tag-list/tag-list.component";

@Component({
  selector: 'app-proyects-page',
  standalone: true,
  imports: [
    ProyectListComponent,
    TagFormComponent,
    TagListComponent
  ],
  templateUrl: './proyects-page.component.html',
  styleUrl: './proyects-page.component.css'
})
export class ProyectsPageComponent {

}
