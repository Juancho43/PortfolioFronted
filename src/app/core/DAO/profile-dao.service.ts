import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Education } from '../interfaces/Education';

@Injectable({
  providedIn: 'root',
})
export class ProfileDaoService {
  private _profile: BehaviorSubject<any> = new BehaviorSubject<any>('');

  getProfile() {
    return this._profile.asObservable();
  }

  setProfile(item: any) {
    this._profile.next(item);
  }
}
