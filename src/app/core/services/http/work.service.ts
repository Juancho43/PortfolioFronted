import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Work } from '@model/Work';
import { environment } from '@environments/environment';
import { ApiResponseCollection } from '@model/ApiResponseCollection';
import { ApiResponse } from '@model/ApiResponse';
import { workEndpoint } from '@endpoints/work.endpoint';

@Injectable({
  providedIn: 'root',
})
export class WorkService {
  private http = inject(HttpClient);

  getAll(): Observable<ApiResponseCollection<Work>> {
    return this.http.get<ApiResponseCollection<Work>>(
      environment.api_url + workEndpoint.getAll,
    );
  }

  getById(id: number): Observable<ApiResponse<Work>> {
    return this.http.get<ApiResponse<Work>>(
      environment.api_url + workEndpoint.getById.replace(':id', id.toString()),
    );
  }

  getBySlug(slug: string): Observable<ApiResponse<Work>> {
    return this.http.get<ApiResponse<Work>>(
      environment.api_url + workEndpoint.getBySlug.replace(':slug', slug),
    );
  }

  post(work: Work): Observable<ApiResponse<Work>> {
    return this.http.post<ApiResponse<Work>>(
      environment.api_url + workEndpoint.post,
      work,
    );
  }

  update(work: Work): Observable<ApiResponse<Work>> {
    return this.http.put<ApiResponse<Work>>(
      environment.api_url + workEndpoint.update,
      work,
    );
  }

  delete(id: number): Observable<ApiResponse<Work>> {
    return this.http.delete<ApiResponse<Work>>(
      environment.api_url + workEndpoint.delete.replace(':id', id.toString()),
    );
  }
}
