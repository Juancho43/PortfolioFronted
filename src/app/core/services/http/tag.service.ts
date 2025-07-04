import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, tap } from 'rxjs';
import { Tag } from '@model/Tag';
import { environment } from '@environments/environment';
import { ApiResponseCollection } from '@model/ApiResponseCollection';
import { ApiResponse } from '@model/ApiResponse';
import { tagEndpoints } from '@endpoints/tag.endpoint';
import { checkToken } from '@core/guards/token.interceptor';
import { NotificationService } from '@services/utils/notification.service';

@Injectable({
  providedIn: 'root',
})
export class TagService {
  private http = inject(HttpClient);
  private notification = inject(NotificationService);

  getAll(): Observable<ApiResponseCollection<Tag>> {
    return this.http.get<ApiResponseCollection<Tag>>(environment.api_url + tagEndpoints.getAll);
  }

  getAllEducationTags(): Observable<ApiResponseCollection<Tag>> {
    return this.http.get<ApiResponseCollection<Tag>>(environment.api_url + tagEndpoints.getEducation);
  }

  getAllWorkTags(): Observable<ApiResponseCollection<Tag>> {
    return this.http.get<ApiResponseCollection<Tag>>(environment.api_url + tagEndpoints.getWork);
  }
  getAllProjectTags(): Observable<ApiResponseCollection<Tag>> {
    return this.http.get<ApiResponseCollection<Tag>>(environment.api_url + tagEndpoints.getProject);
  }
  getById(id: number): Observable<ApiResponse<Tag>> {
    return this.http.get<ApiResponse<Tag>>(environment.api_url + tagEndpoints.getById.replace(':id', id.toString()));
  }

  post(tag: Tag): Observable<ApiResponse<Tag>> {
    return this.http
      .post<ApiResponse<Tag>>(environment.api_url + tagEndpoints.post, tag, {
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

  update(tag: Tag): Observable<ApiResponse<Tag>> {
    return this.http
      .put<ApiResponse<Tag>>(environment.api_url + tagEndpoints.update.replace(':id', tag.id!.toString()), tag, {
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

  delete(id: number): Observable<ApiResponse<Tag>> {
    return this.http
      .delete<ApiResponse<Tag>>(environment.api_url + tagEndpoints.delete.replace(':id', id.toString()), {
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
  search(search: string): Observable<ApiResponseCollection<Tag>> {
    const url = environment.api_url + tagEndpoints.search;
    return this.http
      .get<ApiResponseCollection<Tag>>(url, {
        params: { name: search },
        context: checkToken(),
      })
      .pipe(
        catchError(() => {
          this.notification.showErrorNotification();
          return of();
        }),
      );
  }
}
