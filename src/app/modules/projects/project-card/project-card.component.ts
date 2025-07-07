import { Component, computed, input } from '@angular/core';
import { Project } from '@model/Project';
import { TagListComponent } from '../../tags/tag-list/tag-list.component';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [TagListComponent],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.scss',
})
export class ProjectCardComponent {
  readonly project = input<Project>({} as Project);
  readonly tags = computed(() => this.project().tags?.slice(0, 3) || []);
}
