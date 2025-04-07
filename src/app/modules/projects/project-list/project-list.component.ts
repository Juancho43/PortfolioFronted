import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { ProjectService } from '../../../core/services/project.service';
import { CommonModule } from '@angular/common';
import { ProjectComponent } from '../project/project.component';
import { Project } from '../../../core/interfaces/Project';

import { ProjectCardComponent } from '../project-card/project-card.component';
import { DialogService } from '../../../core/utils/dialog.service';
import { ProjectDaoService } from '../../../core/services/DAO/project-dao.service';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [CommonModule, ProjectCardComponent],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.css',
})
export class ProjectListComponent {
  private projectsDAO = inject(ProjectDaoService);
  private dialog = inject(DialogService);

  @Input() projects: Project[] = [];

  open(item: Project) {
    this.projectsDAO.setProject(item);
    this.dialog.openModal<ProjectComponent, Project>(ProjectComponent);
  }
}
