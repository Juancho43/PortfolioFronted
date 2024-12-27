import {Component, Input} from '@angular/core';
import {Proyecto} from "../../../core/interfaces/Proyecto";
import {TagListComponent} from "../../tags/tag-list/tag-list.component";

@Component({
  selector: 'app-proyect-card',
  standalone: true,
  imports: [
    TagListComponent
  ],
  templateUrl: './proyect-card.component.html',
  styleUrl: './proyect-card.component.css'
})
export class ProyectCardComponent {
  @Input() Proyect! : Proyecto;
}
