import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { Proyecto} from "../interfaces/Proyecto";
import {API_URL, ENDPOINTS} from './endpoints';
import {Education} from '../interfaces/Education';

@Injectable({
  providedIn: 'root'
})
export class ProyectsService {
  private http = inject(HttpClient);

  getProyects() : Observable<any>{
    return this.http.get<any>(API_URL+ENDPOINTS.project.getAll);
  }
  getProyectById(id:number){
    const url = API_URL+ENDPOINTS.project.getById.replace(':id', id.toString());
    return this.http.get(url);
  }

  postProyecto(proyecto : Proyecto) : Observable<any>{
    return this.http.post("http://localhost:8000/api/proyect/", proyecto);
  }

  putProyecto(proyecto : Proyecto) : Observable<any>{
    return this.http.put<Proyecto>(`http://localhost:8000/api/proyect/${proyecto.id}`, proyecto);
  }

  deleteProyecto(proyecto : Proyecto) : Observable<any>{
    return this.http.delete(`http://localhost:8000/api/proyect/${proyecto.id}`);
  }

}
