import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../interfaces/Project';
import { environment } from '../../../environments/environment';
import { ApiResponseCollection } from '../interfaces/ApiResponseCollection';
import { ApiResponse } from '../interfaces/ApiResponse';
import { projectEndpoint } from './endpoints/project.endpoint';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private http = inject(HttpClient);

  getAll(): Observable<ApiResponseCollection<Project>> {
    return this.http.get<ApiResponseCollection<Project>>(
      environment.api_url + projectEndpoint.getAll,
    );
  }

  getById(id: number): Observable<ApiResponse<Project>> {
    return this.http.get<ApiResponse<Project>>(
      environment.api_url +
        projectEndpoint.getById.replace(':id', id.toString()),
    );
  }

  getByTag(id: number): Observable<ApiResponseCollection<Project>> {
    return this.http.get<ApiResponseCollection<Project>>(
      environment.api_url +
        projectEndpoint.getByTag.replace(':id', id.toString()),
    );
  }

  getByEducation(id: number): Observable<ApiResponseCollection<Project>> {
    const url =
      environment.api_url +
      projectEndpoint.getByEducation.replace(':id', id.toString());
    return this.http.get<ApiResponseCollection<Project>>(url);
  }

  post(project: Project): Observable<ApiResponse<Project>> {
    return this.http.post<ApiResponse<Project>>(
      environment.api_url + projectEndpoint.post,
      project,
    );
  }

  update(project: Project): Observable<ApiResponse<Project>> {
    return this.http.put<ApiResponse<Project>>(
      environment.api_url + projectEndpoint.update,
      project,
    );
  }

  delete(id: number): Observable<ApiResponse<any>> {
    return this.http.delete<ApiResponse<Project>>(
      environment.api_url +
        projectEndpoint.delete.replace(':id', id.toString()),
    );
  }
}
