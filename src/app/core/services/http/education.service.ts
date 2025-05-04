import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, tap } from 'rxjs';
import { Education } from '@model/Education';
import { environment } from '@environments/environment';
import { ApiResponseCollection } from '@model/ApiResponseCollection';
import { ApiResponse } from '@model/ApiResponse';
import { educationEndpoint } from '@endpoints/education.endpoint';
import { NotificationService } from '@services/utils/notification.service';
import { checkToken } from '@core/guards/token.interceptor';

@Injectable({
  providedIn: 'root',
})
export class EducationService {
  private http = inject(HttpClient);
  private notification = inject(NotificationService);
  getAll(): Observable<ApiResponseCollection<Education>> {
    return this.http.get<ApiResponseCollection<Education>>(environment.api_url + educationEndpoint.getAll);
  }

  getById(id: number): Observable<ApiResponse<Education>> {
    const url = environment.api_url + educationEndpoint.getById.replace(':id', id.toString());
    return this.http.get<ApiResponse<Education>>(url);
  }

  getByTag(tagName: string): Observable<ApiResponseCollection<Education>> {
    return this.http.get<ApiResponseCollection<Education>>(
      environment.api_url + educationEndpoint.getByTag.replace(':tag', tagName),
    );
  }

  getBySlug(slug: string): Observable<ApiResponse<Education>> {
    return this.http.get<ApiResponse<Education>>(
      environment.api_url + educationEndpoint.getBySlug.replace(':slug', slug.toString()),
    );
  }

  post(education: Education): Observable<ApiResponse<Education>> {
    return this.http
      .post<ApiResponse<Education>>(environment.api_url + educationEndpoint.post, education, {
        context: checkToken(),
      })
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

  update(education: Education): Observable<ApiResponse<Education>> {
    return this.http
      .put<ApiResponse<Education>>(environment.api_url + educationEndpoint.update, education, { context: checkToken() })
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

  delete(id: number): Observable<ApiResponse<Education>> {
    return this.http
      .delete<ApiResponse<Education>>(environment.api_url + educationEndpoint.delete.replace(':id', id.toString()), {
        context: checkToken(),
      })
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
