import {Component, Input} from '@angular/core';
import {Proyecto} from "../../../core/interfaces/Proyecto";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-proyect',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './proyect.component.html',
  styleUrl: './proyect.component.css'
})
export class ProyectComponent {
  @Input() Proyect! : Proyecto;
}
