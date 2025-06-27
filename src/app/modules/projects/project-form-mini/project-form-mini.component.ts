import { Component, effect, inject, input, output, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Project } from '@model/Project';
import { ProjectService } from '@http/project.service';

@Component({
  selector: 'app-project-form-mini',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './project-form-mini.component.html',
  styleUrls: [
    '../../../core/styles/forms.css',
    '../../../core/styles/mini-form.css',
    './project-form-mini.component.css',
  ],
})
export class ProjectFormMiniComponent {
  /** Service for handling tag API operations */
  private service = inject(ProjectService);

  /** Input property for passing a tag to edit */
  readonly currentProject = input<Project>({} as Project);

  /** Event emitted when a new tag is created */
  projectCreated = output<Project>();

  /** Event emitted when a tag is updated */
  projectUpdated = output<Project>();

  /** Event emitted when the form is reset */
  cleaned = output<boolean>();

  /** Signal indicating whether the form is in edit mode */
  edit = signal<boolean>(false);

  /** Form group for tag data input and validation */
  projectForm: FormGroup = new FormGroup({
    id: new FormControl(0),
    name: new FormControl('', [Validators.required]),
  });

  /**
   * Sets up a reactive effect to handle changes to the currentTag input
   * Updates the form and edit mode when a valid tag is provided
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
   * Updates the form with current tag data and sets edit mode to true
   */
  update() {
    this.mapTag();
    this.edit.set(true);
  }

  /**
   * Creates a Project object from form values
   * @returns {Project} Object with Project id and name from the form
   */
  mapperTag(): Project {
    return {
      id: this.projectForm.get('id')?.value,
      name: this.projectForm.get('name')?.value,
      description: '',
    };
  }

  /**
   * Populates the form with data from the current tag
   */
  mapTag() {
    this.projectForm.patchValue({
      id: this.currentProject().id,
      name: this.currentProject().name,
    });
  }

  /**
   * Resets the form and notifies parent component
   */
  clean() {
    this.projectForm.reset();
    this.cleaned.emit(true);
    this.edit.set(false);
  }

  /**
   * Handles form submission
   * Creates a new tag or updates existing one based on edit mode
   * Emits the created/updated tag and cleans the form
   */
  onSubmit() {
    if (!this.edit()) {
      this.service.post(this.mapperTag()).subscribe({
        next: (createdLink) => {
          this.projectCreated.emit(createdLink.data!);
        },
      });
    } else {
      this.service.update(this.mapperTag()).subscribe({
        next: (createdLink) => {
          this.projectUpdated.emit(createdLink.data!);
        },
      });
    }
    this.clean();
  }

  /**
   * Deletes the current tag and resets the form
   */
  deleteProject() {
    this.service.delete(this.currentProject().id!).subscribe({
      next: () => {
        this.clean();
      },
    });
  }
}
