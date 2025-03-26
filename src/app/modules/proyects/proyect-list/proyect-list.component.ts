import { Component, inject, OnInit } from '@angular/core';
import { ProyectsService } from '../../../core/services/proyects.service';
import { CommonModule } from '@angular/common';
import { ProyectComponent } from '../proyect/proyect.component';
import { Project } from '../../../core/interfaces/Project';

import { ProyectCardComponent } from '../proyect-card/proyect-card.component';
import { DialogService } from '../../../core/utils/dialog.service';
import { ProyectDaoService } from '../../../core/DAO/proyect-dao.service';

@Component({
  selector: 'app-proyect-list',
  standalone: true,
  imports: [CommonModule, ProyectCardComponent],
  templateUrl: './proyect-list.component.html',
  styleUrl: './proyect-list.component.css',
})
export class ProyectListComponent implements OnInit {
  private proyectsService = inject(ProyectsService);
  private proyectsDAO = inject(ProyectDaoService);
  private dialog = inject(DialogService);
  proyects: Project[] = [];

  ngOnInit() {
    this.getDataDao();
    this.getData();
  }

  ngOnDestroy() {
    this.proyectsDAO.setProyectos([]);
  }

  getDataDao() {
    this.proyectsDAO.getProyectos().subscribe((res) => {
      this.proyects = res;
    });
  }

  getData() {
    this.proyectsService.getProyects().subscribe({
      next: (x) => {
        // this.proyects = x.project;
      },
    });
  }

  open(item: Project) {
    this.proyectsDAO.setProyecto(item);

    this.dialog.openModal<ProyectComponent, Project>(ProyectComponent);
  }
}
