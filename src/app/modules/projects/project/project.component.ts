import { Component, inject, Input, OnInit } from '@angular/core';
import { Project } from '../../../core/interfaces/Project';
import { CommonModule } from '@angular/common';
import { TagComponent } from '../../tags/tag/tag.component';
import { ProjectDaoService } from '../../../core/DAO/project-dao.service';
import { DialogService } from '../../../core/utils/dialog.service';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [CommonModule, TagComponent],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css',
})
export class ProjectComponent {
  private proyectoDao = inject(ProjectDaoService);
  @Input() project: Project = this.proyectoDao.getEmptyProyecto();

  ngOnInit() {
    this.proyectoDao.getProyecto().subscribe((data) => (this.project = data));
    console.log(this.project);
  }
}
