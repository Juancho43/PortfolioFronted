import { Component, inject, signal } from '@angular/core';
import { EducationListComponent } from '@modules/education/education-list/education-list.component';
import { Tag } from '@model/Tag';
import { Education } from '@model/Education';
import { EducationService } from '@services/education.service';
import { TagListComponent } from '@modules/tags/tag-list/tag-list.component';
import {TagService} from '@services/tag.service';
import {toObservable} from '@angular/core/rxjs-interop';

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

  educationsList = signal<Education[]>([]);
  tagsList = signal<Tag[]>([]);
  selectedTagId = signal<number | null>(null);

  constructor() {
    const selectedTagObservable = toObservable(this.selectedTagId);
    selectedTagObservable.subscribe((tagId) => {
      if (tagId !== null) {
        console.log('Tag selected via Observable:', tagId);
        this.getEducationsByTagId(tagId);
      }
    });
  }

  ngOnInit(): void {
    this.getEducations();
    this.getTags();
  }

  getEducations() {
    this.service.getAll().subscribe((res) => {
      this.educationsList.set(res.data!);
    });
  }

  getEducationsByTagId(id: number) {
    this.service.getByTag(id).subscribe((res) => {
      this.educationsList.set(res.data!);
    })
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
