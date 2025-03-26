import { Component, Input } from '@angular/core';
import { Project } from '../../../core/interfaces/Project';
import { TagListComponent } from '../../tags/tag-list/tag-list.component';
import { Tag } from '../../../core/interfaces/Tag';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [TagListComponent],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.css',
})
export class ProjectCardComponent {
  @Input() Proyect: Project = {
    created_at: new Date(),
    description: '',
    id: 0,
    name: '',
    tags: [],
    updated_at: new Date(),
  };
  tags: Tag[] = [];

  ngOnInit() {
    // this.tags = this.Proyect.tags.slice(0, 3);
  }
}
