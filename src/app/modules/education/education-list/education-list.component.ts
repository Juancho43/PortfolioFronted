import { Component, effect, inject, input, OnDestroy } from '@angular/core';
import { Education } from '@model/Education';
import {EducationComponent} from '@modules/education/education/education.component';
import { rxResource } from '@angular/core/rxjs-interop';
import { of, switchMap } from 'rxjs';
import { EducationService } from '@http/education.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-education-list',
  standalone: true,
  imports: [EducationComponent, RouterLink],
  templateUrl: './education-list.component.html',
  styleUrl: './education-list.component.scss',
})
export  class EducationListComponent implements OnDestroy {
  private service = inject(EducationService);
  readonly educations = input<Education[]>([]);
  readonly tag = input<string>('all');

  educationResource = rxResource({
    params : ()=>{
      return{
        tag: this.tag()
      }
    },
    stream: ({params}) => {
      if (params.tag !== 'all') {
      return this.service.getByTag(params.tag);

      }
        return this.service.getAll();

    },
  });



  ngOnDestroy() {
    this.educationResource.destroy();
  }
}
