import { Component, computed, input } from '@angular/core';
import { Education } from '@model/Education';
import { TagListComponent } from '@modules/tags/tag-list/tag-list.component';

@Component({
  selector: 'app-education-card',
  standalone: true,
  imports: [TagListComponent],
  templateUrl: './education-card.component.html',
  styleUrl: './education-card.component.css',
})
export class EducationCardComponent {
  readonly education = input.required<Education>();
  readonly tags = computed(() => this.education().tags?.slice(0, 3) || []);
}
