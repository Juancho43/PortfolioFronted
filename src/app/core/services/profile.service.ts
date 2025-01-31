import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Profile } from '../interfaces/Profile';
import { ENDPOINTS } from './endpoints';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private http = inject(HttpClient);

  getProfile(id: number) {
    return this.http.get<any>(
      environment.api_url + ENDPOINTS.profile.get.replace(':id', id.toString()),
    );
  }

  postImg(img: FormData, id: number) {
    return this.http.post(
      environment.api_url +
        ENDPOINTS.profile.postImg.replace(':id', id.toString()),
      img,
    );
  }

  putProfile(profile: Profile): Observable<any> {
    return this.http.put<Profile>(
      `http://localhost:8000/api/profile/${profile.id}`,
      profile,
    );
  }

  postCv(cv: FormData, id: number) {
    return this.http.post(
      environment.api_url +
        ENDPOINTS.profile.postCV.replace(':id', id.toString()),
      cv,
    );
  }
}
