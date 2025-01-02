import { Component } from '@angular/core';
import {EducationListComponent} from '../../modules/education/education-list/education-list.component';

@Component({
  selector: 'app-education-page',
  standalone: true,
  imports: [
    EducationListComponent
  ],
  templateUrl: './education-page.component.html',
  styleUrl: './education-page.component.css'
})
export class EducationPageComponent {

}
