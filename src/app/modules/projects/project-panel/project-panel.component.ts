import { Component, inject, signal } from '@angular/core';
import { ProjectFormComponent } from '../project-form/project-form.component';
import { ProjectService } from '@services/http/project.service';
import { Project } from '@model/Project';
import { rxResource } from '@angular/core/rxjs-interop';
import { ProjectCardComponent } from '@modules/projects/project-card/project-card.component';

@Component({
  selector: 'app-project-panel',
  imports: [ProjectFormComponent, ProjectCardComponent],
  standalone: true,
  templateUrl: './project-panel.component.html',
  styleUrl: './project-panel.component.scss',
})
export default class ProjectPanelComponent {
  private service = inject(ProjectService);
  projectsResource = rxResource({
    loader: () => {
      return this.service.getAll();
    },
  });
  currentProject = signal<Project>({} as Project);

  selectHandler(project: Project) {
    this.currentProject.set(project);
  }

  handleClearForm() {
    this.currentProject.set({} as Project);
    this.projectsResource.reload();
  }
}
