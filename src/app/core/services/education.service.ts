import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Education } from '../interfaces/Education';
import { environment } from '../../../environments/environment';
import { ApiResponseCollection } from '../interfaces/ApiResponseCollection';
import { ApiResponse } from '../interfaces/ApiResponse';
import { educationEndpoint } from './endpoints/education.endpoint';

@Injectable({
  providedIn: 'root',
})
export class EducationService {
  private http = inject(HttpClient);

  getAll(): Observable<ApiResponseCollection<Education>> {
    return this.http.get<ApiResponseCollection<Education>>(
      environment.api_url + educationEndpoint.getAll,
    );
  }

  getById(id: number): Observable<ApiResponse<Education>> {
    const url =
      environment.api_url +
      educationEndpoint.getById.replace(':id', id.toString());
    return this.http.get<ApiResponse<Education>>(url);
  }

  getByTag(id: number): Observable<ApiResponseCollection<Education>> {
    return this.http.get<ApiResponseCollection<Education>>(
      environment.api_url +
        educationEndpoint.getByTag.replace(':id', id.toString()),
    );
  }

  post(education: Education): Observable<ApiResponse<Education>> {
    return this.http.post<ApiResponse<Education>>(
      environment.api_url + educationEndpoint.post,
      education,
    );
  }

  update(education: Education): Observable<ApiResponse<Education>> {
    return this.http.put<ApiResponse<Education>>(
      environment.api_url + educationEndpoint.update,
      education,
    );
  }

  delete(id: number): Observable<ApiResponse<any>> {
    return this.http.delete<ApiResponse<Education>>(
      environment.api_url +
        educationEndpoint.delete.replace(':id', id.toString()),
    );
  }
}
