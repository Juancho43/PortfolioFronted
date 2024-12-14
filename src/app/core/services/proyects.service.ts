import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Proyecto} from "../interfaces/Proyecto";
import {Tag} from "../interfaces/Tag";

@Injectable({
  providedIn: 'root'
})
export class ProyectsService {
  private http = inject(HttpClient);

  getProyects() : Observable<any>{
      return this.http.get<any>("http://localhost:8000/v1/proyecto/");
  }
  getProyectById(id:number){
    return this.http.get<Proyecto>(`http://localhost:8000/v1/proyecto/${id}`);
  }

  postProyecto(proyecto : Proyecto) : Observable<any>{
    return this.http.post("http://localhost:8000/v1/proyecto/", proyecto);
  }

  putProyecto(proyecto : Proyecto) : Observable<any>{
    return this.http.put<Proyecto>(`http://localhost:8000/v1/proyecto/${proyecto.id}`, proyecto);
  }

  deleteProyecto(proyecto : Proyecto) : Observable<any>{
    return this.http.delete(`http://localhost:8000/v1/proyecto/${proyecto.id}`);
  }

}
