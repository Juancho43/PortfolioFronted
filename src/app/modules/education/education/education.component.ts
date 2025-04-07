import {Component, inject, Input} from '@angular/core';
import {Education} from '../../../core/interfaces/Education';
import {EducationDaoService} from '../../../core/services/DAO/education-dao.service';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './education.component.html',
  styleUrl: './education.component.css'
})
export class EducationComponent {
  private dao = inject(EducationDaoService);
  @Input() education : Education = this.dao.getEmptyEducation();
  @Input() reverse : boolean = false;
   ngOnInit(){


  }

}
