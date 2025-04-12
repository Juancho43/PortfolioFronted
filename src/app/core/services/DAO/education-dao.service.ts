import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Education } from '@model/Education';

@Injectable({
  providedIn: 'root',
})
export class EducationDaoService {
  private _education: BehaviorSubject<Education> =
    new BehaviorSubject<Education>(this.getEmptyEducation());
  private _educations: BehaviorSubject<Education[]> = new BehaviorSubject<
    Education[]
  >([]);

  getEducation() {
    return this._education.asObservable();
  }

  setEducation(item: Education) {
    this._education.next(item);
  }

  getEducations() {
    return this._educations.asObservable();
  }

  setEducations(items: Education[]) {
    this._educations.next(items);
  }

  addNewEducation(item: Education) {
    const currentEducations = this._educations.getValue();
    this._educations.next([...currentEducations, item]);
  }

  getEmptyEducation(): Education {
    return {
      id: 0,
      name: '',
      description: '',
      startDate: new Date(0, 1, 1),
      endDate: new Date(0, 1, 1),
      created_at: new Date(0, 1, 1),
      updated_at: new Date(0, 1, 1),
      deleted_at: new Date(0, 1, 1),
    };
  }
}
