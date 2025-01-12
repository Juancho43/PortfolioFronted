import {Component, inject} from '@angular/core';
import {EducationService} from '../../../core/services/education.service';
import {Education} from '../../../core/interfaces/Education';
import {EducationComponent} from '../education/education.component';

@Component({
  selector: 'app-education-list',
  standalone: true,
  imports: [
    EducationComponent,
  ],
  templateUrl: './education-list.component.html',
  styleUrl: './education-list.component.css'
})
export class EducationListComponent{
  private educationService = inject(EducationService);
  data : Education[] = [];


  constructor(){
    this.getEducationData()

  }


  getEducationData(){
    this.educationService.getAll().subscribe(res=>{
      this.data = res.education;
      console.log(res.education);

    })
  }
}
