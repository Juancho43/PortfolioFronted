import { Component, effect, inject, input, OnDestroy } from '@angular/core';
import { MetaTagsService } from '@services/utils/meta-tags.service';
import { Tag } from '@model/Tag';
import { EducationService } from '@http/education.service';
import { LinkComponent } from '@modules/links/link/link.component';
import { TagComponent } from '@modules/tags/tag/tag.component';
import ProjectListComponent from '@modules/projects/project-list/project-list.component';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-education-detail',
  standalone: true,
  imports: [LinkComponent, TagComponent, ProjectListComponent],
  templateUrl: './education-detail.component.html',
  styleUrls: ['../../../core/styles/detail.css','./education-detail.component.css'],
})
export default class EducationDetailComponent implements  OnDestroy {
  private meta = inject(MetaTagsService);
  private service = inject(EducationService);
  readonly slug = input<string>('');

  educationResource = rxResource({
    request : () => ({
      slug : this.slug(),
    }),
    loader: ({request}) => {
        return this.service.getBySlug(request.slug);
    },
  });

  constructor() {
    effect(() => {
      this.educationResource.value();
      if(!this.educationResource.isLoading()) this.setMetaTags();

    });
  }


  ngOnDestroy(): void {
    this.meta.updateTitle('Bravo, Juan Alé');
    this.meta.removeAllMetaTags();
  }

  setMetaTags() {
    const education = this.educationResource.value()!.data!;
    this.meta.updateTitle(`${education.name} - Formación `);
    this.meta.addMetaTags([
      {
        name: education.name,
        content: education.name,
      },
      {
        name: 'description',
        content: education.description,
      },
      {
        name: 'og:description',
        content: education.description,
      },
      {
        name: 'keywords',
        content: education.tags?.length ? education.tags.map((tag: Tag) => tag.name).join(',') : '',
      },
    ]);
  }

}
