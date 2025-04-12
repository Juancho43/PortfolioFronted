import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { Project } from '../../../core/interfaces/Project';
import { CommonModule } from '@angular/common';
import { TagComponent } from '../../tags/tag/tag.component';
import { ProjectDaoService } from '../../../core/services/DAO/project-dao.service';
import { DialogService } from '@services/utils/dialog.service';
import { LinkComponent } from '@modules/links/link/link.component';
import { ProjectService } from '@http/project.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MetaTagsService } from '@services/utils/meta-tags.service';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [CommonModule, TagComponent, LinkComponent],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css',
})
export class ProjectComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private meta = inject(MetaTagsService);
  private service = inject(ProjectService);
  private dao = inject(ProjectDaoService);

  @Input() project: Project = this.dao.getEmptyProject();

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const slug = params['slug'];
      if (slug) {
        this.getData(slug);
      }
    });
  }

  ngOnDestroy(): void {
    this.meta.updateTitle('Bravo, Juan Alé');
    this.meta.removeAllMetaTags();
  }

  setMetaTags() {
    this.meta.updateTitle(`Proyecto - ${this.project.name}`);
    this.meta.addMetaTags([
      {
        name: this.project.name,
        content: this.project.name,
      },
      {
        name: 'description',
        content: this.project.description,
      },
      {
        name: 'keywords',
        content: this.project.tags!.map((tag) => tag.name).join(','),
      },
    ]);
  }
  getData(slug: string) {
    this.service.getBySlug(slug).subscribe({
      next: (data) => {
        this.project = data.data!;
        this.setMetaTags();
      },
      error: (error) => {
        this.router.navigateByUrl('/projects');
      },
    });
  }
}
