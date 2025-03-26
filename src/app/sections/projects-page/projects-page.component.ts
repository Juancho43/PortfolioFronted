import { Component } from '@angular/core';
import { ProjectListComponent } from '../../modules/projects/project-list/project-list.component';
import { OptionListComponent } from '../../modules/tags/option-list/option-list.component';

@Component({
  selector: 'app-projects-page',
  standalone: true,
  imports: [ProjectListComponent, OptionListComponent],
  templateUrl: './projects-page.component.html',
  styleUrl: './projects-page.component.css',
})
export class ProjectsPageComponent {}
