import { Component, effect, inject, OnDestroy, output, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ProjectService } from '@http/project.service';
import { Project } from '@model/Project';
import { FormsModule } from '@angular/forms';
import { TagComponent } from '@modules/tags/tag/tag.component';

@Component({
  selector: 'app-project-searcher',
  standalone: true,
  imports: [FormsModule, TagComponent],
  templateUrl: './project-searcher.component.html',
  styleUrl: './project-searcher.component.scss',
})
export class ProjectSearcherComponent implements OnDestroy {
  private service = inject(ProjectService);
  projectSelected = output<Project>();
  searchTerm = signal<string>('');
  projects = rxResource({
    request: () => ({
      requestProject: this.searchTerm(),
    }),
    loader: ({ request }) => {
      if (request.requestProject.length > 0) {
        return this.service.search(request.requestProject);
      } else {
        return this.service.getAll();
      }
    },
  });

  constructor() {
    effect(() => {
      this.searchTerm();
      this.projects.reload();
    });
  }

  ngOnDestroy() {
    this.projects.destroy();
  }

  selectProject(project: Project) {
    this.projectSelected.emit(project);
  }
}
