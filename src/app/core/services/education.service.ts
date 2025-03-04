import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Education } from '../interfaces/Education';
import { API_URL, ENDPOINTS } from './endpoints';
import { environment } from '../../../environments/environment';
import { ApiResponseCollection } from '../interfaces/ApiResponseCollection';
import { ApiResponse } from '../interfaces/ApiResponse';

@Injectable({
  providedIn: 'root',
})
export class EducationService {
  private http = inject(HttpClient);

  getAll(): Observable<ApiResponseCollection<Education>>{
    return this.http.get<ApiResponseCollection<Education>>(environment.api_url + ENDPOINTS.education.getAll);
  }
  getById(id: number) {
    const url =
      environment.api_url +
      ENDPOINTS.education.getById.replace(':id', id.toString());
    return this.http.get<ApiResponse<Education>>(url);
  }

  getByType(type: string) {
    return this.http.get<any>(
      environment.api_url +
        ENDPOINTS.education.getByType.replace(':type', type),
    );
  }

  post(education: Education): Observable<any> {
    return this.http.post(
      environment.api_url + ENDPOINTS.education.post,
      education,
    );
  }

  put(education: Education): Observable<any> {
    return this.http.put<Education>(
      `http://localhost:8000/api/v1/education/${education.id}`,
      education,
    );
  }

  delete(education: Education): Observable<any> {
    return this.http.delete(
      `http://localhost:8000/api/v1/education/${education.id}`,
    );
  }
}
