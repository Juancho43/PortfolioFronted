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
  styleUrls: ['../../../core/styles/detail.css', './project-detail.component.css'],
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
      if (!this.projectResource.isLoading()) this.setMetaTags();
    });
  }

  ngOnDestroy(): void {
    this.meta.updateTitle('Bravo, Juan Alé');
    this.meta.removeAllMetaTags();
  }

  setMetaTags() {
    const project = this.projectResource.value()!.data!;
    this.meta.updateTitle(`${project.name} - Proyecto`);
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
        name: 'og:description',
        content: project.description,
      },
      {
        name: 'keywords',
        content: project.tags?.length ? project.tags.map((tag: Tag) => tag.name).join(',') : '',
      },
    ]);
  }
}
