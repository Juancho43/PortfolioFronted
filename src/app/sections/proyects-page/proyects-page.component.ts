import {Component, inject} from '@angular/core';
import {ProyectListComponent} from "../../modules/proyects/proyect-list/proyect-list.component";
import {TagFormComponent} from "../../modules/tags/tag-form/tag-form.component";
import {TagListComponent} from "../../modules/tags/tag-list/tag-list.component";
import {OptionListComponent} from '../../modules/tags/option-list/option-list.component';

@Component({
  selector: 'app-proyects-page',
  standalone: true,
  imports: [
    ProyectListComponent,
    OptionListComponent
  ],
  templateUrl: './proyects-page.component.html',
  styleUrl: './proyects-page.component.css'
})
export class ProyectsPageComponent {

}
