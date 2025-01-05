import {Component, inject} from '@angular/core';
import {EducationService} from '../../../core/services/education.service';
import {Education} from '../../../core/interfaces/Education';
import {ProyectCardComponent} from '../../proyects/proyect-card/proyect-card.component';
import {EducationComponent} from '../education/education.component';
import {JsonPipe} from '@angular/common';

@Component({
  selector: 'app-education-list',
  standalone: true,
  imports: [
    ProyectCardComponent,
    EducationComponent,
    JsonPipe
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
