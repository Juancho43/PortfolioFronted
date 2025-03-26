import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../interfaces/Project';
import { API_URL, ENDPOINTS } from './endpoints';
import { Education } from '../interfaces/Education';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProyectsService {
  private http = inject(HttpClient);

  getProyects(): Observable<any> {
    return this.http.get<any>(environment.api_url + ENDPOINTS.project.getAll);
  }
  getProyectById(id: number) {
    const url =
      environment.api_url +
      ENDPOINTS.project.getById.replace(':id', id.toString());
    return this.http.get(url);
  }

  postProyecto(proyecto: Project): Observable<any> {
    return this.http.post('http://localhost:8000/api/proyect/', proyecto);
  }

  putProyecto(proyecto: Project): Observable<any> {
    return this.http.put<Project>(
      `http://localhost:8000/api/proyect/${proyecto.id}`,
      proyecto,
    );
  }

  deleteProyecto(proyecto: Project): Observable<any> {
    return this.http.delete(`http://localhost:8000/api/proyect/${proyecto.id}`);
  }
}
