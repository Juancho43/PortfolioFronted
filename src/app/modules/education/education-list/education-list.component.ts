import { Component, Input } from '@angular/core';
import { Education } from '@model/Education';
import { EducationComponent } from '../education/education.component';

@Component({
  selector: 'app-education-list',
  standalone: true,
  imports: [EducationComponent],
  templateUrl: './education-list.component.html',
  styleUrl: './education-list.component.css',
})
export class EducationListComponent {
  @Input() educations: Education[] = [];
}
