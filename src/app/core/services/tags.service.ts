import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tag } from '../interfaces/Tag';
import { API_URL, ENDPOINTS } from './endpoints';
import { environment } from '../../../environments/environment';
import { ApiResponseCollection } from '../interfaces/ApiResponseCollection';
import { ApiResponse } from '../interfaces/ApiResponse';

@Injectable({
  providedIn: 'root',
})
export class TagsService {
  private http = inject(HttpClient);

  getTags(): Observable<ApiResponseCollection<Tag>> {
    return this.http.get<ApiResponseCollection<Tag>>(environment.api_url + ENDPOINTS.tag.getAll);
  }
  getTagById(id: number) {
    return this.http.get<ApiResponse<Tag>>(`http://localhost:8000/api/tag/${id}`);
  }
  getProjectsByTag(id: number) {
    const url =
      environment.api_url +
      ENDPOINTS.project.getByTag.replace(':id', id.toString());
    return this.http.get(url);
  }
  postTag(tag: Tag): Observable<any> {
    return this.http.post('http://localhost:8000/api/tag/', tag);
  }

  putTag(tag: Tag): Observable<any> {
    return this.http.put<Tag>(`http://localhost:8000/api/tag/${tag.id}`, tag);
  }

  deleteTag(tag: Tag): Observable<any> {
    return this.http.delete(`http://localhost:8000/api/tag/${tag.id}`);
  }
}
