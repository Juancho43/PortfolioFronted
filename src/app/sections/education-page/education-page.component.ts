import { Component, inject, Inject } from '@angular/core';
import { EducationListComponent } from '../../modules/education/education-list/education-list.component';

import { Tag } from '../../core/interfaces/Tag';
import { Education } from '../../core/interfaces/Education';
import { TagComponent } from '../../modules/tags/tag/tag.component';
import { EducationService } from '../../core/services/education.service';

@Component({
  selector: 'app-education-page',
  standalone: true,
  imports: [EducationListComponent, TagComponent],
  templateUrl: './education-page.component.html',
  styleUrl: './education-page.component.css',
})
export class EducationPageComponent {
  private service = inject(EducationService);

  EducationList: Education[] = [];

  filtros: Tag[] = [
    {
      id: 0,
      name: 'Academico',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 1,
      name: 'Curso',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 2,
      name: 'Todo',
      created_at: new Date(),
      updated_at: new Date(),
    },
  ];

  getEducation(type: string) {
    if (type == '') {
      this.service.getAll().subscribe((res) => {
        this.EducationList = res.education;
      });
    } else {
      this.service.getByType(type).subscribe((res) => {
        this.EducationList = res.education;
      });
    }
  }
}
