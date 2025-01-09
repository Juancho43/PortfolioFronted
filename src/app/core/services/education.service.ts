import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Education} from "../interfaces/Education";
import {API_URL, ENDPOINTS} from './endpoints';

@Injectable({
  providedIn: 'root'
})
export class EducationService {

  private http = inject(HttpClient);

  getAll() : Observable<any>{
    return this.http.get<any>(API_URL+ENDPOINTS.education.getAll);
  }
  getById(id:number){
    const url = API_URL+ENDPOINTS.education.getById.replace(':id', id.toString());
    return this.http.get<Education>(url);
  }

  post(education : Education) : Observable<any>{
    return this.http.post("http://localhost:8000/api/v1/education/", education);
  }

  put(education : Education) : Observable<any>{
    return this.http.put<Education>(`http://localhost:8000/api/v1/education/${education.id}`, education);
  }

  delete(education : Education) : Observable<any>{
    return this.http.delete(`http://localhost:8000/api/v1/education/${education.id}`);
  }

}
