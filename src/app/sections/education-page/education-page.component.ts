import { Component, inject, signal } from '@angular/core';
import { EducationListComponent } from '@modules/education/education-list/education-list.component';
import { Tag } from '@model/Tag';
import { Education } from '@model/Education';
import { EducationService } from '@services/http/education.service';
import { TagListComponent } from '@modules/tags/tag-list/tag-list.component';
import { TagService } from '@services/http/tag.service';
import { toObservable } from '@angular/core/rxjs-interop';
import {MetaTagsService} from '@services/utils/meta-tags.service';

@Component({
  selector: 'app-education-page',
  standalone: true,
  imports: [EducationListComponent, TagListComponent],
  templateUrl: './education-page.component.html',
  styleUrl: './education-page.component.css',
})
export class EducationPageComponent {
  private service = inject(EducationService);
  private tagService = inject(TagService);
  private metaTagService = inject(MetaTagsService);
  educationsList = signal<Education[]>([]);
  tagsList = signal<Tag[]>([]);
  selectedTagId = signal<number | null>(null);

  constructor() {
    const selectedTagObservable = toObservable(this.selectedTagId);
    selectedTagObservable.subscribe((tagId) => {
      if (tagId !== null) {
        this.getEducationsByTagId(tagId);
      }
    });
  }

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

  getEducationsByTagId(id: number) {
    this.service.getByTag(id).subscribe((res) => {
      this.educationsList.set(res.data!);
    });
  }
  getTags(): void {
    this.tagService.getAllEducationTags().subscribe((res) => {
      this.tagsList.set(res.data!);
    });
  }

  handleTagSelected(tagId: number): void {
    this.selectedTagId.set(tagId);
  }
}
