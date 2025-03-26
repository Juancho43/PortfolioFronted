import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Project } from '../interfaces/Project';
import { Tag } from '../interfaces/Tag';

@Injectable({
  providedIn: 'root',
})
export class ProyectDaoService {
  private _projects: BehaviorSubject<Project[]> = new BehaviorSubject<
    Project[]
  >([]);
  private _proyect: BehaviorSubject<Project> = new BehaviorSubject<Project>(
    this.getEmptyProyecto(),
  );

  getProyecto() {
    return this._proyect.asObservable();
  }

  setProyecto(item: Project) {
    this._proyect.next(item);
  }

  getProyectos() {
    return this._projects.asObservable();
  }

  setProyectos(items: Project[]) {
    this._projects.next(items);
  }

  getEmptyProyecto(): Project {
    return {
      created_at: new Date(),
      description: '',
      id: 0,
      name: '',
      updated_at: new Date(),

      tags: [],
    };
  }
}
