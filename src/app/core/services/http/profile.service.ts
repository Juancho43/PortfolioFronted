import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Profile } from '@model/Profile';
import { environment } from '@environments/environment';
import { ApiResponse } from '@model/ApiResponse';
import { profileEndpoint } from '@endpoints/profile.endpoint';
import { checkToken } from '@core/guards/token.interceptor';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private http = inject(HttpClient);

  getProfile(id: number): Observable<ApiResponse<Profile>> {
    return this.http.get<ApiResponse<Profile>>(
      environment.api_url + profileEndpoint.get.replace(':id', id.toString()),
    );
  }

  postImg(img: FormData, id: number): Observable<ApiResponse<string>> {
    return this.http.post<ApiResponse<string>>(
      environment.api_url +
        profileEndpoint.postImg.replace(':id', id.toString()),
      img,
      { context: checkToken() },
    );
  }

  postCv(cv: FormData, id: number): Observable<ApiResponse<string>> {
    return this.http.post<ApiResponse<string>>(
      environment.api_url +
        profileEndpoint.postCV.replace(':id', id.toString()),
      cv,
      { context: checkToken() },
    );
  }

  putProfile(profile: Profile): Observable<ApiResponse<Profile>> {
    return this.http.put<ApiResponse<Profile>>(
      profileEndpoint.update.replace(':id', profile.id!.toString()) +
        environment.api_url,
      profile,
      { context: checkToken() },
    );
  }
}
