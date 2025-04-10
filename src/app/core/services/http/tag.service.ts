import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tag } from '@model/Tag';
import { environment } from '@environments/environment';
import { ApiResponseCollection } from '@model/ApiResponseCollection';
import { ApiResponse } from '@model/ApiResponse';
import { tagEndpoints } from '@endpoints/tag.endpoint';

@Injectable({
  providedIn: 'root',
})
export class TagService {
  private http = inject(HttpClient);

  getAll(): Observable<ApiResponseCollection<Tag>> {
    return this.http.get<ApiResponseCollection<Tag>>(
      environment.api_url + tagEndpoints.getAll,
    );
  }

  getAllEducationTags(): Observable<ApiResponseCollection<Tag>> {
    return this.http.get<ApiResponseCollection<Tag>>(
      environment.api_url + tagEndpoints.getEducation,
    );
  }

  getAllWorkTags(): Observable<ApiResponseCollection<Tag>> {
    return this.http.get<ApiResponseCollection<Tag>>(
      environment.api_url + tagEndpoints.getWork,
    );
  }
  getAllProjectTags(): Observable<ApiResponseCollection<Tag>> {
    return this.http.get<ApiResponseCollection<Tag>>(
      environment.api_url + tagEndpoints.getProject,
    );
  }
  getById(id: number): Observable<ApiResponse<Tag>> {
    return this.http.get<ApiResponse<Tag>>(
      environment.api_url + tagEndpoints.getById.replace(':id', id.toString()),
    );
  }

  post(tag: Tag): Observable<ApiResponse<Tag>> {
    return this.http.post<ApiResponse<Tag>>(
      environment.api_url + tagEndpoints.post,
      tag,
    );
  }

  update(tag: Tag): Observable<ApiResponse<Tag>> {
    return this.http.put<ApiResponse<Tag>>(
      environment.api_url + tagEndpoints.update,
      tag,
    );
  }

  delete(id: number): Observable<ApiResponse<any>> {
    return this.http.delete<ApiResponse<Tag>>(
      environment.api_url + tagEndpoints.delete.replace(':id', id.toString()),
    );
  }
}
