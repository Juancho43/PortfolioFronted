import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Project } from '../../interfaces/Project';


@Injectable({
  providedIn: 'root',
})
export class ProjectDaoService {
  private _projects: BehaviorSubject<Project[]> = new BehaviorSubject<
    Project[]
  >([]);
  private _project: BehaviorSubject<Project> = new BehaviorSubject<Project>(
    this.getEmptyProject(),
  );

  getProject() {
    return this._project.asObservable();
  }

  setProject(item: Project) {
    this._project.next(item);
  }

  getProjects() {
    return this._projects.asObservable();
  }

  setProjects(items: Project[]) {
    this._projects.next(items);
  }

  addNewProject(item: Project) {
    const currentProjects = this._projects.getValue();
    this._projects.next([...currentProjects, item]);
  }

  getEmptyProject(): Project {
    return {
      description: '',
      name: '',
    };
  }
}
