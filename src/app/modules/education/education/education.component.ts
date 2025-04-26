import { Component, inject, input } from '@angular/core';
import { Education } from '@model/Education';
import { EducationDaoService } from '@dao/education-dao.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './education.component.html',
  styleUrl: './education.component.css',
})
export default class EducationComponent {
  private dao = inject(EducationDaoService);
  readonly education = input<Education>(this.dao.getEmptyEducation());
  readonly reverse = input(false);
}
