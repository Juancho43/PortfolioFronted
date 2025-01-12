import { Component } from '@angular/core';
import { EducationFormComponent } from '../education-form/education-form.component';
import { EducationListComponent } from '../education-list/education-list.component';

@Component({
  selector: 'app-education-panel',
  imports: [EducationFormComponent, EducationListComponent],
  standalone: true,
  templateUrl: './education-panel.component.html',
  styleUrl: './education-panel.component.css',
})
export class EducationPanelComponent {}
