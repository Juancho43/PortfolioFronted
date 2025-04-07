import { Component, inject, Input, signal } from '@angular/core';
import { Project } from '../../../core/interfaces/Project';
import { TagListComponent } from '../../tags/tag-list/tag-list.component';
import { Tag } from '../../../core/interfaces/Tag';
import { ProjectDaoService } from '../../../core/services/DAO/project-dao.service';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [TagListComponent],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.css',
})
export class ProjectCardComponent {
  private dao = inject(ProjectDaoService);

  @Input() project: Project = this.dao.getEmptyProject();
  tags = signal<Tag[]>([]);

  ngOnInit() {
    this.tags.set(this.project.tags!.slice(0, 3));
  }
}
