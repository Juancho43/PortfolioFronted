import {Component, effect, input, output, signal} from '@angular/core';
import {ProjectSearcherComponent} from '@modules/projects/project-searcher/project-searcher.component';
import {TagComponent} from '@modules/tags/tag/tag.component';
import {Project} from '@model/Project';
import { ProjectFormMiniComponent } from '@modules/projects/project-form-mini/project-form-mini.component';




@Component({
  selector: 'app-join-project',
  standalone: true,
  imports: [ProjectSearcherComponent, TagComponent, ProjectFormMiniComponent],
  templateUrl: './join-project.component.html',
  styleUrls: ['../../../core/styles/join.css','../../../core/styles/forms.css','./join-project.component.css'],
})
export class JoinProjectComponent {
  readonly initialProjects = input.required<Project[]>();

  currentProjects = signal<Project[]>([]);
  selectedProject = signal<Project>({} as Project);
  finalProjects = output<Project[]>();

  show = signal<boolean>(false);
  showForm = signal<boolean>(false);
  showSearch = signal<boolean>(false);

  constructor() {
    effect(() => {
      this.initialProjects();
      this.currentProjects.set(this.initialProjects());
    });
  }

  toggleShow() {
    this.show.set(!this.show());
  }
  toggleShowForm() {
    this.showForm.set(!this.showForm());
    if(this.showForm()) this.showSearch.set(false);
  }
  toggleShowSearch() {
    this.showSearch.set(!this.showSearch());
    if(this.showSearch()) this.showForm.set(false);
  }

  reset() {
    this.currentProjects.set([]);
  }
  editProject(tag: Project) {
    this.selectedProject.set(tag);
  }
  handleClearForm() {
    this.selectedProject.set({} as Project);
  }

  addProject(tag: Project) {
    if (!this.currentProjects().some((t) => t.id === tag.id)) {
      const updatedProjects = [...this.currentProjects(), tag];
      this.currentProjects.set(updatedProjects);
      this.finalProjects.emit(updatedProjects);
    }
  }

  updateProject(tag: Project) {
    const updatedProjects = this.currentProjects().map((t) => (t.id === tag.id ? tag : t));
    this.currentProjects.set(updatedProjects);
    this.finalProjects.emit(updatedProjects);
  }

  removeProject(tag: Project) {
    const updatedProjects = this.currentProjects().filter((t) => t.id !== tag.id);
    this.currentProjects.set(updatedProjects);
    this.finalProjects.emit(updatedProjects);
  }
}
