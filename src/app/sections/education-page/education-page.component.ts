import { Component, inject, input, OnDestroy, OnInit, signal } from '@angular/core';

import { Tag } from '@model/Tag';
import { Education } from '@model/Education';
import { EducationService } from '@services/http/education.service';
import { TagListComponent } from '@modules/tags/tag-list/tag-list.component';
import { TagService } from '@services/http/tag.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { MetaTagsService } from '@services/utils/meta-tags.service';
import { SpinnerComponent } from '@core/shared/spinner/spinner.component';
import EducationListComponent from '@modules/education/education-list/education-list.component';

@Component({
  selector: 'app-education-page',
  standalone: true,
  imports: [TagListComponent, SpinnerComponent, EducationListComponent],
  templateUrl: './education-page.component.html',
  styleUrl: './education-page.component.css',
})
export default class EducationPageComponent implements OnInit, OnDestroy {
  private service = inject(EducationService);
  private tagService = inject(TagService);
  private metaTagService = inject(MetaTagsService);

  tag = input<string>();

  educationsList = signal<Education[]>([]);
  educationsResource = rxResource({
    loader: () => this.service.getAll(),
  });

  tagsList = signal<Tag[]>([]);
  constructor() {}

  ngOnInit(): void {
    this.getEducations();
    this.getTags();
    this.setMetaTags();
  }

  ngOnDestroy(): void {
    this.metaTagService.removeAllMetaTags();
    this.metaTagService.updateTitle('Bravo, Juan Alé');
  }

  setMetaTags() {
    this.metaTagService.updateTitle('Formación');
    this.metaTagService.addMetaTags([
      { name: 'description', content: 'Formación realizada.' },
      { name: 'og:description', content: 'Formación realizada.' },
    ]);
  }
  getEducations() {
    this.service.getAll().subscribe((res) => {
      this.educationsList.set(res.data!);
    });
  }

  getEducationsByTagId(tagName: string) {
    this.service.getByTag(tagName).subscribe((res) => {
      // this.educationsResource.set([res.data!);
    });
  }
  getTags(): void {
    this.tagService.getAllEducationTags().subscribe((res) => {
      this.tagsList.set(res.data!);
    });
  }
}
