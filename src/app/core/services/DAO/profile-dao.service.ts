import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Profile } from '../../interfaces/Profile';

@Injectable({
  providedIn: 'root',
})
export class ProfileDaoService {
  private _profile: BehaviorSubject<Profile> = new BehaviorSubject<Profile>(this.getEmptyProfile());

  getProfile() {
    return this._profile.asObservable();
  }

  setProfile(item: Profile) {
    this._profile.next(item);
  }

  getEmptyProfile(): Profile {
    return {
      id: 0,
      name: '',
      rol: '',
      description: '',
      links: [],
    };
  }
}
