import { Component, effect, inject, input, OnDestroy } from '@angular/core';
import { Education } from '@model/Education';
import EducationComponent from '@modules/education/education/education.component';
import { rxResource } from '@angular/core/rxjs-interop';
import { of, switchMap } from 'rxjs';
import { EducationService } from '@http/education.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-education-list',
  standalone: true,
  imports: [EducationComponent,RouterLink],
  templateUrl: './education-list.component.html',
  styleUrl: './education-list.component.css',
})
export default class EducationListComponent implements OnDestroy {
  private service = inject(EducationService);
  readonly educations = input<Education[]>([]);
  readonly tag = input<string>('all');

  educationResource = rxResource({
    loader: () => {
      const currentTag = this.tag();
      if (currentTag !== 'all') {
        return this.service.getByTag(currentTag).pipe(switchMap((res) => of(res.data || [])));
      } else if (currentTag.includes('all')) {
        return this.service.getAll().pipe(switchMap((res) => of(res.data || [])));
      }
      return of(this.educations());
    },
  });

  constructor() {
    effect(() => {
      this.tag();
      this.educationResource.reload();
    });
  }

  ngOnDestroy() {
    this.educationResource.destroy();
  }
}
