import { Component, inject, Input } from '@angular/core';
import { TagService } from '../../../core/services/tag.service';
import { ProjectDaoService } from '../../../core/DAO/project-dao.service';
import { Tag } from '../../../core/interfaces/Tag';
import { TagOptionComponent } from '../tag-option/tag-option.component';
import { Router } from '@angular/router';
import { ProjectService } from '../../../core/services/project.service';

@Component({
  selector: 'app-option-list',
  imports: [TagOptionComponent],
  standalone: true,
  templateUrl: './option-list.component.html',
  styleUrl: './option-list.component.css',
})
export class OptionListComponent {
  private tagsService = inject(TagService);
  private projectService = inject(ProjectService);
  private projectDAO = inject(ProjectDaoService);
  @Input() tags: Tag[] = [];
  @Input() load: boolean = true;
  ngOnInit() {
    if (this.load) {
      this.getData();
    }
  }

  getData() {
    this.tagsService.getAll().subscribe({
      next: (res) => {
        this.tags = res.data!;
      },
    });
  }
  getProjects(id: number) {
    this.projectService.getByTag(id).subscribe({
      next: (res) => {
        this.projectDAO.setProyectos(res.data!);
      },
    });
  }
}
