import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Proyecto} from '../interfaces/Proyecto';
import {Education} from '../interfaces/Education';

@Injectable({
  providedIn: 'root'
})
export class EducationDaoService {

  private _education : BehaviorSubject<Education> = new BehaviorSubject<Education>(this.getEmptyEducation());

  getEducation(){
    return this._education.asObservable();
  }

  setEducation(item : Education){
    this._education.next(item);
  }


  getEmptyEducation() : Education{
    return{
      created_at: new Date(),
      deleted_at: new Date(),
      description: '',
      endDate: new Date(),
      id: 0,
      name: '',
      startDate: new Date(),
      type: '',
      updated_at: new Date()

    }
  }
}
