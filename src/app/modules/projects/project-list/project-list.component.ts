import { Component, Input } from '@angular/core';

import { CommonModule } from '@angular/common';
import { Project } from '@model/Project';
import { ProjectCardComponent } from '../project-card/project-card.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [CommonModule, ProjectCardComponent, RouterLink],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.css',
})
export class ProjectListComponent {
  @Input() projects: Project[] = [];
}
