import { Component, inject, Input } from '@angular/core';
import { TagsService } from '../../../core/services/tags.service';
import { ProyectDaoService } from '../../../core/DAO/proyect-dao.service';
import { Tag } from '../../../core/interfaces/Tag';
import { TagOptionComponent } from '../tag-option/tag-option.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-option-list',
  imports: [TagOptionComponent],
  standalone: true,
  templateUrl: './option-list.component.html',
  styleUrl: './option-list.component.css',
})
export class OptionListComponent {
  private tagsService = inject(TagsService);
  private projectDAO = inject(ProyectDaoService);
  @Input() tags: Tag[] = [];
  @Input() load: boolean = true;
  ngOnInit() {
    if (this.load) {
      this.getData();
    }
  }

  getData() {
    this.tagsService.getTags().subscribe({
      next: (x) => {
        this.tags = x.Tags;
      },
    });
  }
  getProjects(id: number) {
    this.tagsService.getProjectsByTag(id).subscribe({
      next: (x: any) => {
        this.projectDAO.setProyectos(x.project);
      },
    });
  }
}
