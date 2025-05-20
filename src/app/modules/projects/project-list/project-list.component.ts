import { Component, effect, inject, Input, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from '@model/Project';
import { ProjectCardComponent } from '../project-card/project-card.component';
import { RouterLink } from '@angular/router';
import { ProjectService } from '@http/project.service';
import { rxResource } from '@angular/core/rxjs-interop';

import { of, switchMap } from 'rxjs';


@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [CommonModule, ProjectCardComponent, RouterLink],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.css',
})
export default class ProjectListComponent {
  private service = inject(ProjectService);
  readonly tag = input<string>('none');
  // readonly projectsList = input<Project[]>([]);
  @Input() projectsList: Project[] = [];
  projectsResource = rxResource({
    loader: () => {
      const projectsList = this.projectsList;
      const currentTag = this.tag();
       if (currentTag !== 'all' && currentTag !== 'none') {
        return this.service.getByTag(currentTag).pipe(switchMap((res) => of(res.data || [])));
        }else if(currentTag === 'all') {
        return this.service.getAll().pipe(switchMap((res) => of(res.data || [])));
        }
        return of(projectsList);
    }}
      )



  constructor() {
    effect(() => {
      this.tag();
      this.projectsResource.reload();
    });
  }
}
