import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Tag} from "../interfaces/Tag";

@Injectable({
  providedIn: 'root'
})
export class TagsService {
  private http = inject(HttpClient);

  getTags() : Observable<any>{
    return this.http.get<any>("http://localhost:8000/api/tag/");
  }
  getTagById(id:number){
    return this.http.get<Tag>(`http://localhost:8000/api/tag/${id}`);
  }

  postTag(tag : Tag) : Observable<any>{
    return this.http.post("http://localhost:8000/api/tag/", tag);
  }

  putTag(tag : Tag) : Observable<any>{
    return this.http.put<Tag>(`http://localhost:8000/api/tag/${tag.id}`, tag);
  }

  deleteTag(tag : Tag) : Observable<any>{
    return this.http.delete(`http://localhost:8000/api/tag/${tag.id}`);
  }
}
