import {Component, inject, OnInit} from '@angular/core';
import {ProyectsService} from "../../../core/services/proyects.service";
import {CommonModule} from "@angular/common";
import {ProyectComponent} from "../proyect/proyect.component";
import {Proyecto} from "../../../core/interfaces/Proyecto";

import {ProyectCardComponent} from "../proyect-card/proyect-card.component";
import {DialogService} from "../../../core/utils/dialog.service";
import {ProyectDaoService} from "../../../core/DAO/proyect-dao.service";
import {MatDialogConfig} from "@angular/material/dialog";

@Component({
  selector: 'app-proyect-list',
  standalone: true,
  imports: [CommonModule, ProyectComponent, ProyectCardComponent],
  templateUrl: './proyect-list.component.html',
  styleUrl: './proyect-list.component.css'
})
export class ProyectListComponent implements OnInit {
  private proyectsService = inject(ProyectsService);
  private proyectsDAO = inject(ProyectDaoService);
  private dialog = inject(DialogService);
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

  open(item : Proyecto){
    this.proyectsDAO.setProyecto(item);

    this.dialog.openModal<ProyectComponent,Proyecto>(
      ProyectComponent
    );
  }
}
