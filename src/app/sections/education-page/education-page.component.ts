import { Component, inject, Inject, signal } from '@angular/core';
import { EducationListComponent } from '../../modules/education/education-list/education-list.component';

import { Tag } from '../../core/interfaces/Tag';
import { Education } from '../../core/interfaces/Education';
import { TagComponent } from '../../modules/tags/tag/tag.component';
import { EducationService } from '../../core/services/education.service';
import { TagListComponent } from '../../modules/tags/tag-list/tag-list.component';

@Component({
  selector: 'app-education-page',
  standalone: true,
  imports: [EducationListComponent, TagComponent, TagListComponent],
  templateUrl: './education-page.component.html',
  styleUrl: './education-page.component.css',
})
export class EducationPageComponent {
  private service = inject(EducationService);

  educationsList = signal<Education[]>([]);

  ngOnInit(): void {
    this.getEducations();
  }

  getEducations() {
    this.service.getAll().subscribe((res) => {
      this.educationsList.set(res.data!);
    });
  }
}
