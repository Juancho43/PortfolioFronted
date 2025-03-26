import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Link } from '../interfaces/Link';
import { environment } from '../../../environments/environment';
import { ApiResponseCollection } from '../interfaces/ApiResponseCollection';
import { ApiResponse } from '../interfaces/ApiResponse';
import { linkEndpoints } from './endpoints/link.endpoint';

@Injectable({
  providedIn: 'root',
})
export class LinkService {
  private http = inject(HttpClient);

  getAll(): Observable<ApiResponseCollection<Link>> {
    return this.http.get<ApiResponseCollection<Link>>(
      environment.api_url + linkEndpoints.getAll,
    );
  }

  getById(id: number): Observable<ApiResponse<Link>> {
    return this.http.get<ApiResponse<Link>>(
      environment.api_url + linkEndpoints.getById.replace(':id', id.toString()),
    );
  }

  post(link: Link): Observable<ApiResponse<Link>> {
    return this.http.post<ApiResponse<Link>>(
      environment.api_url + linkEndpoints.post,
      link,
    );
  }

  update(link: Link): Observable<ApiResponse<Link>> {
    return this.http.put<ApiResponse<Link>>(
      environment.api_url + linkEndpoints.update,
      link,
    );
  }

  delete(id: number): Observable<ApiResponse<any>> {
    return this.http.delete<ApiResponse<any>>(
      environment.api_url + linkEndpoints.delete.replace(':id', id.toString()),
    );
  }
}
