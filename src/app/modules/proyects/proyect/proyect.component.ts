import {Component, Input} from '@angular/core';
import {Proyecto} from "../../../core/interfaces/Proyecto";
import {CommonModule} from "@angular/common";
import {TagComponent} from "../../tags/tag/tag.component";

@Component({
  selector: 'app-proyect',
  standalone: true,
  imports: [CommonModule, TagComponent],
  templateUrl: './proyect.component.html',
  styleUrl: './proyect.component.css'
})
export class ProyectComponent {
  @Input() Proyect! : Proyecto;
}
