import { Component, input } from '@angular/core';
import { Education } from '@model/Education';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './education.component.html',
  styleUrl: './education.component.scss',
})
export default class EducationComponent {
  readonly education = input<Education>({} as Education);
  readonly reverse = input(false);
}
