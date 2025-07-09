import { Component, effect, inject, input, OnDestroy } from '@angular/core';
import { Project } from '@model/Project';
import { CommonModule } from '@angular/common';
import { TagComponent } from '../../tags/tag/tag.component';
import { LinkComponent } from '@modules/links/link/link.component';
import { ProjectService } from '@http/project.service';
import { MetaTagsService } from '@services/utils/meta-tags.service';
import { Tag } from '@model/Tag';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [CommonModule, TagComponent, LinkComponent],
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.scss',
})
export default class ProjectDetailComponent implements OnDestroy {
  private service = inject(ProjectService);
  private meta = inject(MetaTagsService);
  readonly slug = input<string>('');
  readonly currentProject = input<Project>({} as Project);

  projectResource = rxResource({
    request: () => ({
      slug: this.slug(),
      currentProject: this.currentProject(),
    }),
    loader: ({ request }) => {
      return this.service.getBySlug(request.slug);
    },
  });
  constructor() {
    effect(() => {
      this.projectResource.value();
      if (!this.projectResource.isLoading()) {
        this.meta.removeAllMetaTags();
        this.setMetaTags();
      }
    });
  }

  ngOnDestroy(): void {
    this.meta.addTitle('Bravo, Juan Alé');
    this.meta.removeAllMetaTags();
  }

  setMetaTags() {
    this.meta.removeAllMetaTags();
    const project = this.projectResource.value()!.data!;
    this.meta.addTitle(`${project.name} - Proyecto`);
    this.meta.addDescriptionMetaTag(project.description);
    this.meta.addKeywordsMetaTag(project.tags?.length ? project.tags.map((tag: Tag) => tag.name).join(',') : '');
    this.meta.addMetaTags([
      {
        name: 'og:type',
        content: 'article',
      },
      {
        name: 'og:url',
        content: window.location.href,
      },
    ]);
  }
}
