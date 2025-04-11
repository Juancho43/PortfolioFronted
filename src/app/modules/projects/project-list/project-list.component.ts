import { Component, inject, Input, OnInit, signal } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ProjectComponent } from '../project/project.component';
import { Project } from '@model/Project';
import { ProjectCardComponent } from '../project-card/project-card.component';
import { DialogService } from '@services/utils/dialog.service';
import { ProjectDaoService } from '@dao/project-dao.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [CommonModule, ProjectCardComponent, RouterLink],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.css',
})
export class ProjectListComponent {
  private projectsDAO = inject(ProjectDaoService);

  @Input() projects: Project[] = [];

  open(item: Project) {
    this.projectsDAO.setProject(item);
  }
}
