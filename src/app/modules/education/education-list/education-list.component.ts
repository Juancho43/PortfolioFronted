import {Component, inject} from '@angular/core';
import {EducationService} from '../../../core/services/education.service';

@Component({
  selector: 'app-education-list',
  standalone: true,
  imports: [],
  templateUrl: './education-list.component.html',
  styleUrl: './education-list.component.css'
})
export class EducationListComponent {
  private educationService = inject(EducationService);
  data : any;

  ngOnInit(){
    this.getEducationData()
    console.log(this.data);
  }


  getEducationData(){
    this.educationService.getAll().subscribe(res=>{
      this.data = res;
    })
  }
}
