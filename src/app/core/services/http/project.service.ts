import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, tap } from 'rxjs';
import { Project } from '@model/Project';
import { environment } from '@environments/environment';
import { ApiResponseCollection } from '@model/ApiResponseCollection';
import { ApiResponse } from '@model/ApiResponse';
import { projectEndpoint } from '@endpoints/project.endpoint';
import { checkToken } from '@core/guards/token.interceptor';
import { NotificationService } from '@services/utils/notification.service';
import { Tag } from '@model/Tag';
import { tagEndpoints } from '@endpoints/tag.endpoint';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private http = inject(HttpClient);
  private notification = inject(NotificationService);

  getAll(): Observable<ApiResponseCollection<Project>> {
    return this.http.get<ApiResponseCollection<Project>>(environment.api_url + projectEndpoint.getAll);
  }

  getById(id: number): Observable<ApiResponse<Project>> {
    return this.http.get<ApiResponse<Project>>(
      environment.api_url + projectEndpoint.getById.replace(':id', id.toString()),
    );
  }

  getByTag(tagName: string): Observable<ApiResponseCollection<Project>> {
    return this.http.get<ApiResponseCollection<Project>>(
      environment.api_url + projectEndpoint.getByTag.replace(':tag', tagName),
    );
  }

  getBySlug(slug: string): Observable<ApiResponse<Project>> {
    return this.http.get<ApiResponse<Project>>(
      environment.api_url + projectEndpoint.getBySlug.replace(':slug', slug.toString()),
    );
  }

  getByEducation(slug: string): Observable<ApiResponseCollection<Project>> {
    const url = environment.api_url + projectEndpoint.getByEducation.replace(':slug', slug);
    return this.http.get<ApiResponseCollection<Project>>(url);
  }

  post(project: Project): Observable<ApiResponse<Project>> {
    return this.http
      .post<ApiResponse<Project>>(environment.api_url + projectEndpoint.post, project, {
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

  update(project: Project): Observable<ApiResponse<Project>> {
    return this.http
      .put<ApiResponse<Project>>(
        environment.api_url + projectEndpoint.update.replace(':id', project.id!.toString()),
        project,
        {
          context: checkToken(),
        },
      )
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

  delete(id: number): Observable<ApiResponse<Project>> {
    return this.http
      .delete<ApiResponse<Project>>(
        environment.api_url + projectEndpoint.delete.replace(':id', id.toString()),

        {
          context: checkToken(),
        },
      )
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
  search(search: string): Observable<ApiResponseCollection<Project>> {
    const url = environment.api_url + projectEndpoint.search;
    return this.http
      .get<ApiResponseCollection<Project>>(url, {
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
