import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, tap } from 'rxjs';
import { Link } from '@model/Link';
import { environment } from '@environments/environment';
import { ApiResponseCollection } from '@model/ApiResponseCollection';
import { ApiResponse } from '@model/ApiResponse';
import { linkEndpoints } from '@endpoints/link.endpoint';
import { checkToken } from '@core/guards/token.interceptor';
import { NotificationService } from '@services/utils/notification.service';

@Injectable({
  providedIn: 'root',
})
export class LinkService {
  private http = inject(HttpClient);
  private notification = inject(NotificationService);
  getAll(): Observable<ApiResponseCollection<Link>> {
    return this.http.get<ApiResponseCollection<Link>>(environment.api_url + linkEndpoints.getAll);
  }

  getById(id: number): Observable<ApiResponse<Link>> {
    return this.http.get<ApiResponse<Link>>(environment.api_url + linkEndpoints.getById.replace(':id', id.toString()));
  }

  post(link: Link): Observable<ApiResponse<Link>> {
    return this.http
      .post<ApiResponse<Link>>(environment.api_url + linkEndpoints.post, link, {
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

  update(link: Link): Observable<ApiResponse<Link>> {
    return this.http
      .put<ApiResponse<Link>>(environment.api_url + linkEndpoints.update, link, {
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

  delete(id: number): Observable<ApiResponse<Link>> {
    return this.http
      .delete<
        ApiResponse<Link>
      >(environment.api_url + linkEndpoints.delete.replace(':id', id.toString()), { context: checkToken() })
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
