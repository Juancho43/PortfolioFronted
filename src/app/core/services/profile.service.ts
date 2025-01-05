import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Profile} from "../interfaces/Profile";


@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private http = inject(HttpClient);

  getProfile(id:number){
    return this.http.get(`http://localhost:8000/api/profile/${id}`);
  }

  postProfile(profile : Profile) : Observable<any>{
    return this.http.post("http://localhost:8000/api/profile/", profile);
  }

  putProfile(profile : Profile) : Observable<any>{
    return this.http.put<Profile>(`http://localhost:8000/api/profile/${profile.id}`, profile);
  }

  deleteProfile(proyecto : Profile) : Observable<any>{
    return this.http.delete(`http://localhost:8000/api/profile/${proyecto.id}`);
  }

}
