import { Component, effect, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from '@model/Project';
import { ProjectCardComponent } from '../project-card/project-card.component';
import { RouterLink } from '@angular/router';
import { ProjectService } from '@http/project.service';
import { rxResource } from '@angular/core/rxjs-interop';

import { of, switchMap } from 'rxjs';
import { SpinnerComponent } from '@core/shared/spinner/spinner.component';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [CommonModule, ProjectCardComponent, RouterLink, SpinnerComponent],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.css',
})
export default class ProjectListComponent {
  private service = inject(ProjectService);
  readonly tag = input<string>('all');
  readonly projectsList = input<Project[]>([]);

  projectsResource = rxResource({
    loader: () => {
      const currentTag = this.tag();
      if (currentTag !== 'all') {
        return this.service.getByTag(currentTag).pipe(switchMap((res) => of(res.data || [])));
      } else if (currentTag.includes('all')) {
        return this.service.getAll().pipe(switchMap((res) => of(res.data || [])));
      }
      return of(this.projectsList());
    },
  });

  constructor() {
    effect(() => {
      this.tag();
      this.projectsResource.reload();
    });
  }
}
