import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Education} from "../interfaces/Education";

@Injectable({
  providedIn: 'root'
})
export class EducationService {

  private http = inject(HttpClient);

  getAll() : Observable<any>{
    return this.http.get<any>("http://localhost:8000/v1/formacion/");
  }
  getById(id:number){
    return this.http.get<Education>(`http://localhost:8000/v1/formacion/${id}`);
  }

  post(education : Education) : Observable<any>{
    return this.http.post("http://localhost:8000/v1/formacion/", education);
  }

  put(education : Education) : Observable<any>{
    return this.http.put<Education>(`http://localhost:8000/v1/formacion/${education.id}`, education);
  }

  delete(education : Education) : Observable<any>{
    return this.http.delete(`http://localhost:8000/v1/formacion/${education.id}`);
  }

}
