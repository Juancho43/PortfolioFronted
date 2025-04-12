import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { Project } from '@model/Project';
import { TagListComponent } from '../../tags/tag-list/tag-list.component';
import { Tag } from '@model/Tag';
import { ProjectDaoService } from '@dao/project-dao.service';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [TagListComponent],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.css',
})
export class ProjectCardComponent implements OnInit {
  private dao = inject(ProjectDaoService);

  @Input() project: Project = this.dao.getEmptyProject();
  tags = signal<Tag[]>([]);

  ngOnInit() {
    this.tags.set(this.project.tags!.slice(0, 3));
  }
}
