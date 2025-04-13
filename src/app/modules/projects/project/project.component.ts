import { Component, inject, OnDestroy, OnInit, input } from '@angular/core';
import { Project } from '@model/Project';
import { CommonModule } from '@angular/common';
import { TagComponent } from '../../tags/tag/tag.component';
import { ProjectDaoService } from '@dao/project-dao.service';
import { LinkComponent } from '@modules/links/link/link.component';
import { ProjectService } from '@http/project.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MetaTagsService } from '@services/utils/meta-tags.service';
import { Tag } from '@model/Tag';

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

  project: Project = this.dao.getEmptyProject();

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
    let project = this.project;
    this.meta.updateTitle(`Proyecto - ${project.name}`);
    this.meta.addMetaTags([
      {
        name: project.name,
        content: project.name,
      },
      {
        name: 'description',
        content: project.description,
      },
      {
        name: 'keywords',
        content: project.tags!.map((tag: Tag) => tag.name).join(','),
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
