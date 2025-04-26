import { Component, input } from '@angular/core';
import { Education } from '@model/Education';
import EducationComponent from '@modules/education/education/education.component';

@Component({
  selector: 'app-education-list',
  standalone: true,
  imports: [EducationComponent],
  templateUrl: './education-list.component.html',
  styleUrl: './education-list.component.css',
})
export default class EducationListComponent {
  readonly educations = input<Education[]>([]);
}
