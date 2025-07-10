import { Component, inject, signal } from '@angular/core';
import { EducationFormComponent } from '../education-form/education-form.component';
import { EducationService } from '@services/http/education.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { Education } from '@model/Education';
import { EducationCardComponent } from '@modules/education/education-card/education-card.component';

@Component({
  selector: 'app-education-panel',
  imports: [EducationFormComponent, EducationCardComponent],
  standalone: true,
  templateUrl: './education-panel.component.html',
  styleUrl: './education-panel.component.scss',
})
export default class EducationPanelComponent {
  private service = inject(EducationService);
  educationsResource = rxResource({
    stream: () => {
      return this.service.getAll();
    },
  });
  currentEducation = signal<Education>({} as Education);

  selectHandler(education: Education) {
    this.currentEducation.set(education);
  }

  handleClearForm() {
    this.currentEducation.set({} as Education);
    this.educationsResource.reload();
  }
}
