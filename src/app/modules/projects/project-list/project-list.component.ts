import { Component,  inject, Input, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from '@model/Project';
import { ProjectCardComponent } from '../project-card/project-card.component';
import { RouterLink } from '@angular/router';
import { ProjectService } from '@http/project.service';
import { rxResource } from '@angular/core/rxjs-interop';

import { of, switchMap } from 'rxjs';
import { ApiResponseCollection } from '@model/ApiResponseCollection';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [CommonModule, ProjectCardComponent, RouterLink],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.scss',
})
export  class ProjectListComponent {
  private service = inject(ProjectService);
  readonly tag = input<string>('');
  // readonly projectsList = input<Project[]>([]);

  projectsResource = rxResource({
    stream: () =>


        this.service.getAll()



  });


}
