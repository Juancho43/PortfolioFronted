import {Component, inject, OnInit} from '@angular/core';
import {ProyectsService} from "../../../core/services/proyects.service";
import {CommonModule} from "@angular/common";
import {ProyectComponent} from "../proyect/proyect.component";
import {Proyecto} from "../../../core/interfaces/Proyecto";

@Component({
  selector: 'app-proyect-list',
  standalone: true,
  imports: [CommonModule, ProyectComponent],
  templateUrl: './proyect-list.component.html',
  styleUrl: './proyect-list.component.css'
})
export class ProyectListComponent implements OnInit {
  private proyectsService = inject(ProyectsService);
  proyects : Proyecto[] = [];

  ngOnInit() {
    this.getData();
  }

  getData(){
    this.proyectsService.getProyects().subscribe({

      next : (x) => {
        this.proyects = x.proyectoDTOList;
        console.log(this.proyects)

      }
    })
  }
}
