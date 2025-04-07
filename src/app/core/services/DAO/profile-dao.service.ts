import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Profile } from '../../interfaces/Profile';

@Injectable({
  providedIn: 'root',
})
export class ProfileDaoService {
  private _profile: BehaviorSubject<Profile> = new BehaviorSubject<Profile>(
    this.getEmptyProfile(),
  );

  getProfile() {
    return this._profile.asObservable();
  }

  setProfile(item: any) {
    this._profile.next(item);
  }

  getVariable(variable: string) {
    // return this._profile.getValue().links.find(link => link.name === variable)?.link;
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
