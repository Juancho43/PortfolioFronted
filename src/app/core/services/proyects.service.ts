import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Proyecto} from "../interfaces/Proyecto";

@Injectable({
  providedIn: 'root'
})
export class ProyectsService {
  private http = inject(HttpClient);

  getProyects() : Observable<any>{
      return this.http.get<any>("http://localhost:8000/v1/proyecto/");
  }

}
