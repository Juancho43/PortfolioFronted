import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Proyecto } from '../interfaces/Proyecto';
import { API_URL, ENDPOINTS } from './endpoints';
import { Education } from '../interfaces/Education';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../interfaces/ApiResponse';
import { ApiResponseCollection } from '../interfaces/ApiResponseCollection';


@Injectable({
  providedIn: 'root',
})
export class ProyectsService {
  private http = inject(HttpClient);

  getProyects(): Observable<ApiResponseCollection<Proyecto>> {
    return this.http.get<ApiResponseCollection<Proyecto>>(environment.api_url + ENDPOINTS.project.getAll);
  }
  getProyectById(id: number) {
    const url =
      environment.api_url +
      ENDPOINTS.project.getById.replace(':id', id.toString());
    return this.http.get<ApiResponse<Proyecto>>(url);
  }

  postProyecto(proyecto: Proyecto): Observable<any> {
    return this.http.post('http://localhost:8000/api/proyect/', proyecto);
  }

  putProyecto(proyecto: Proyecto): Observable<any> {
    return this.http.put<Proyecto>(
      `http://localhost:8000/api/proyect/${proyecto.id}`,
      proyecto,
    );
  }

  deleteProyecto(proyecto: Proyecto): Observable<any> {
    return this.http.delete(`http://localhost:8000/api/proyect/${proyecto.id}`);
  }
}
