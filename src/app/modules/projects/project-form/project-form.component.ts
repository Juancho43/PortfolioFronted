import { Component, effect, inject, input, output, signal } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Project } from '@model/Project';
import { Tag } from '@model/Tag';
import { ProjectService } from '@services/http/project.service';
import { Link } from '@model/Link';
import { JoinTagComponent } from '@modules/tags/join-tag/join-tag.component';
import { JoinLinkComponent } from '@modules/links/join-link/join-link.component';

/**
 * Component for creating and editing projects.
 * Provides form functionality for project management with support for tags and links.
 */
@Component({
  selector: 'app-project-form',
  standalone: true,
  imports: [ReactiveFormsModule, JoinTagComponent, JoinLinkComponent],
  templateUrl: './project-form.component.html',
  styleUrls: [ '../../../core/styles/forms.css','./project-form.component.css'],
})
export class ProjectFormComponent {
  /** Service for handling project API operations */
  private service = inject(ProjectService);

  /** Required input property that receives the project to be viewed or edited */
  readonly currentProject = input.required<Project>();

  /** Output event emitted when a new project is created */
  projectCreated = output<Project>();

  /** Output event emitted when an existing project is updated */
  projectUpdated = output<Project>();

  /** Output event emitted when the form is cleaned/reset */
  cleaned = output<boolean>();

  /** Signal that indicates if the component is in edit mode */
  edit = signal<boolean>(false);

  /** Form group for project data input with validation */
  projectForm: FormGroup = new FormGroup({
    id: new FormControl(0),
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    tags: new FormArray<FormControl<number[]>>([]),
    links: new FormArray<FormControl<number[]>>([]),
  });

  /**
   * Sets up a reactive effect to monitor changes to currentProject
   * and update the form and edit state accordingly.
   */
  constructor() {
    effect(() => {
      const project = this.currentProject();
      // Only consider it an edit operation if the project has a valid ID
      if (project && project.id) {
        this.update();
      } else {
        this.edit.set(false);
      }
    });
  }

  /**
   * Resets the form, emits cleaned event, and sets edit mode to false
   */
  clean() {
    this.projectForm.reset();
    this.patchTagsValues([]);
    this.patchLinksValues([]);
    this.cleaned.emit(true);
    this.edit.set(false);
  }

  /**
   * Updates the form with current project data and sets edit mode to true
   */
  update() {
    this.mapProject();
    this.edit.set(true);
  }

  /**
   * Maps form data to a project object
   * @returns {Project} Project data extracted from the form
   */
  mapperProject(): Project {
    return {
      id: this.projectForm.get('id')?.value,
      name: this.projectForm.get('name')?.value,
      description: this.projectForm.get('description')?.value,
      tags: this.projectForm.get('tags')?.value,
      links: this.projectForm.get('links')?.value,
    };
  }

  /**
   * Maps the current project data to the form fields
   */
  mapProject() {
    this.projectForm.patchValue({
      id: this.currentProject().id,
      name: this.currentProject().name,
      description: this.currentProject().description,
      tags: this.currentProject().tags!,
      links: this.currentProject().links!,
    });
    this.patchTagsValues();
    this.patchLinksValues();
  }

  /**
   * Populates the tags FormArray with tag IDs from the current project
   * @param {Tag[]} tags - Optional array of tags to use instead of project tags
   */
  patchTagsValues(tags: Tag[] = this.currentProject().tags || []) {
    const tagsArray = this.projectForm.get('tags') as FormArray;
    tagsArray.clear();
    tags.forEach((tag) => {
      tagsArray.push(new FormControl(tag.id));
    });
  }

  /**
   * Populates the links FormArray with link IDs from the current project
   * @param {Link[]} links - Optional array of links to use instead of project links
   */
  patchLinksValues(links: Link[] = this.currentProject().links || []) {
    const linksArray = this.projectForm.get('links') as FormArray;
    linksArray.clear();
    links.forEach((link) => {
      linksArray.push(new FormControl(link.id));
    });
  }

  /**
   * Handles form submission by either creating a new project or updating an existing one
   * based on the edit state. Emits appropriate events and cleans the form afterward.
   */
  onSubmit() {
    if (!this.edit()) {
      this.service.post(this.mapperProject()).subscribe({
        next: (response) => {
          this.projectCreated.emit(response.data!);
        },
      });
    } else {
      this.service.update(this.mapperProject()).subscribe({
        next: (response) => {
          this.projectUpdated.emit(response.data!);
        },
      });
    }
    this.clean();
  }

  /**
   * Deletes the current project and cleans the form
   */
  deleteProject() {
    this.service.delete(this.currentProject().id!).subscribe({
      next: () => {
        this.clean();
      },
    });
  }
}
