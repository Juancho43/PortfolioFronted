import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Proyecto} from "../interfaces/Proyecto";
import {Tag} from "../interfaces/Tag";

@Injectable({
  providedIn: 'root'
})
export class ProyectDaoService {
  private _projects: BehaviorSubject<Proyecto[]> = new BehaviorSubject<Proyecto[]>([]);
  private _proyect : BehaviorSubject<Proyecto> = new BehaviorSubject<Proyecto>(this.getEmptyProyecto());

  getProyecto(){
    return this._proyect.asObservable();
  }

  setProyecto(item : Proyecto){
    this._proyect.next(item);
  }


  getProyectos(){
    return this._projects.asObservable();
  }

  setProyectos(items : Proyecto[]){
    this._projects.next(items);
  }

  getEmptyProyecto() : Proyecto{
    return{
      created_at: new Date(), description: '', id: 0, name: '', updated_at: new Date(),

      tags: []
    }
  }
}
