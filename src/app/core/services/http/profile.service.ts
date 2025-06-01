import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, tap } from 'rxjs';
import { Profile } from '@model/Profile';
import { environment } from '@environments/environment';
import { ApiResponse } from '@model/ApiResponse';
import { profileEndpoint } from '@endpoints/profile.endpoint';
import { checkToken } from '@core/guards/token.interceptor';
import { NotificationService } from '@services/utils/notification.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private http = inject(HttpClient);
  private notification = inject(NotificationService);
  getProfile(id: number): Observable<ApiResponse<Profile>> {
    return this.http.get<ApiResponse<Profile>>(environment.api_url + profileEndpoint.get.replace(':id', id.toString()));
  }

  postImg(img: FormData, id: number): Observable<ApiResponse<string>> {
    return this.http
      .post<
        ApiResponse<string>
      >(environment.api_url + profileEndpoint.postImg.replace(':id', id.toString()), img, { context: checkToken() })
      .pipe(
        tap(() => {
          this.notification.showSuccesNotification();
        }),
        catchError(() => {
          this.notification.showErrorNotification();
          return of();
        }),
      );
  }

  postCv(cv: FormData, id: number): Observable<ApiResponse<string>> {
    return this.http
      .post<
        ApiResponse<string>
      >(environment.api_url + profileEndpoint.postCV.replace(':id', id.toString()), cv, { context: checkToken() })
      .pipe(
        tap(() => {
          this.notification.showSuccesNotification();
        }),
        catchError(() => {
          this.notification.showErrorNotification();
          return of();
        }),
      );
  }

  putProfile(profile: Profile): Observable<ApiResponse<Profile>> {
    return this.http
      .put<
        ApiResponse<Profile>
      >(environment.api_url + profileEndpoint.update.replace(':id', profile.id!.toString()), profile, { context: checkToken() })
      .pipe(
        tap(() => {
          this.notification.showSuccesNotification();
        }),
        catchError(() => {
          this.notification.showErrorNotification();
          return of();
        }),
      );
  }
}
