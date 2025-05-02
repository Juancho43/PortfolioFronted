import { Component, inject, OnInit, signal } from '@angular/core';
import { ProjectFormComponent } from '../project-form/project-form.component';
import { ProjectService } from '@services/http/project.service';
import { ProjectDaoService } from '@dao/project-dao.service';
import { Project } from '@model/Project';
import { rxResource } from '@angular/core/rxjs-interop';
import { ProjectCardComponent } from '@modules/projects/project-card/project-card.component';

@Component({
  selector: 'app-project-panel',
  imports: [ProjectFormComponent, ProjectCardComponent],
  standalone: true,
  templateUrl: './project-panel.component.html',
  styleUrls: ['./project-panel.component.css', '../../../core/styles/panel.css'],
})
export default class ProjectPanelComponent implements OnInit {
  private service = inject(ProjectService);
  private dao = inject(ProjectDaoService);
  projectsResource = rxResource({
    loader: () => {
      return this.service.getAll();
    },
  });
  currentProject = signal<Project>(this.dao.getEmptyProject());

  ngOnInit() {}

  selectHandler(project: Project) {
    this.currentProject.set(project);
  }
}
