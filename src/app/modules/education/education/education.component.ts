import { Component, inject, Input } from '@angular/core';
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
export class EducationComponent {
  private dao = inject(EducationDaoService);
  @Input() education: Education = this.dao.getEmptyEducation();
  @Input() reverse = false;
}
