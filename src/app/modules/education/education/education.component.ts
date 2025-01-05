import {Component, inject, Input} from '@angular/core';
import {ProyectDaoService} from '../../../core/DAO/proyect-dao.service';
import {Proyecto} from '../../../core/interfaces/Proyecto';
import {Education} from '../../../core/interfaces/Education';
import {EducationDaoService} from '../../../core/DAO/education-dao.service';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [],
  templateUrl: './education.component.html',
  styleUrl: './education.component.css'
})
export class EducationComponent {
  private dao = inject(EducationDaoService);
  @Input() education : Education = this.dao.getEmptyEducation();

  ngOnInit(){


  }

}
