import { Component, inject, OnInit } from '@angular/core';
import { ProjectService } from '../../../core/services/project.service';
import { CommonModule } from '@angular/common';
import { ProjectComponent } from '../project/project.component';
import { Project } from '../../../core/interfaces/Project';

import { ProjectCardComponent } from '../project-card/project-card.component';
import { DialogService } from '../../../core/utils/dialog.service';
import { ProyectDaoService } from '../../../core/DAO/proyect-dao.service';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [CommonModule, ProjectCardComponent],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.css',
})
export class ProjectListComponent implements OnInit {
  private service = inject(ProjectService);
  private projectsDAO = inject(ProyectDaoService);
  private dialog = inject(DialogService);
  projects: Project[] = [];

  ngOnInit() {
    this.getDataDao();
    this.getData();
  }

  ngOnDestroy() {
    this.projectsDAO.setProyectos([]);
  }

  getDataDao() {
    this.projectsDAO.getProyectos().subscribe((res) => {
      this.projects = res;
    });
  }

  getData() {
    this.service.getAll().subscribe({
      next: (res) => {
        this.projects = res.data!;
      },
    });
  }

  open(item: Project) {
    this.projectsDAO.setProyecto(item);

    this.dialog.openModal<ProjectComponent, Project>(ProjectComponent);
  }
}
