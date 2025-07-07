import { Component, effect, inject, input, output, signal } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EducationService } from '@services/http/education.service';
import { Education } from '@model/Education';
import { Tag } from '@model/Tag';
import { Link } from '@model/Link';
import { Project } from '@model/Project';
import { JoinLinkComponent } from '@modules/links/join-link/join-link.component';
import { JoinTagComponent } from '@modules/tags/join-tag/join-tag.component';
import { JoinProjectComponent } from '@modules/projects/join-project/join-project.component';

@Component({
  selector: 'app-education-form',
  standalone: true,
  imports: [ReactiveFormsModule, JoinLinkComponent, JoinTagComponent, JoinProjectComponent],
  templateUrl: './education-form.component.html',
  styleUrl: './education-form.component.scss',
})
export class EducationFormComponent {
  /** Service for handling project API operations */
  private service = inject(EducationService);

  /** Required input property that receives the project to be viewed or edited */
  readonly currentEducation = input.required<Education>();

  /** Output event emitted when a new project is created */
  educationCreated = output<Education>();

  /** Output event emitted when an existing project is updated */
  educationUpdated = output<Education>();

  /** Output event emitted when the form is cleaned/reset */
  cleaned = output<boolean>();

  /** Signal that indicates if the component is in edit mode */
  edit = signal<boolean>(false);

  EducationForm: FormGroup = new FormGroup({
    id: new FormControl(0),
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    startDate: new FormControl(new Date(0, 1, 1), [Validators.required]),
    endDate: new FormControl(null),
    tags: new FormArray<FormControl<number[]>>([]),
    links: new FormArray<FormControl<number[]>>([]),
    projects: new FormArray<FormControl<number[]>>([]),
  });

  constructor() {
    effect(() => {
      const education = this.currentEducation();
      // Only consider it an edit operation if the education has a valid ID
      if (education && education.id) {
        this.update();
      } else {
        this.edit.set(false);
      }
    });
  }

  clean() {
    this.EducationForm.reset();
    this.patchTagsValues([]);
    this.patchLinksValues([]);
    this.patchProjectsValues([]);
    this.cleaned.emit(true);
    this.edit.set(false);
  }

  update() {
    this.mapEducation();
    this.edit.set(true);
  }

  mapEducation() {
    this.EducationForm.patchValue({
      id: this.currentEducation().id,
      name: this.currentEducation().name,
      description: this.currentEducation().description,
      startDate: this.currentEducation().start_date,
      endDate: this.currentEducation().end_date!,
      projects: this.currentEducation().projects!,
      tags: this.currentEducation().tags!,
      links: this.currentEducation().links!,
    });
    this.patchTagsValues();
    this.patchLinksValues();
    this.patchProjectsValues();
  }
  patchTagsValues(tags: Tag[] = this.currentEducation().tags || []) {
    const tagsArray = this.EducationForm.get('tags') as FormArray;
    tagsArray.clear();
    tags.forEach((tag) => {
      tagsArray.push(new FormControl(tag.id));
    });
  }

  patchProjectsValues(projects: Project[] = this.currentEducation().projects || []) {
    const projectsArray = this.EducationForm.get('projects') as FormArray;
    projectsArray.clear();
    projects.forEach((project) => {
      projectsArray.push(new FormControl(project.id));
    });
  }
  patchLinksValues(links: Link[] = this.currentEducation().links || []) {
    const linksArray = this.EducationForm.get('links') as FormArray;
    linksArray.clear();
    links.forEach((link) => {
      linksArray.push(new FormControl(link.id));
    });
  }
  mapperEducation(): Education {
    return {
      id: this.EducationForm.get('id')?.value,
      name: this.EducationForm.get('name')?.value,
      description: this.EducationForm.get('description')?.value,
      start_date: this.EducationForm.get('startDate')?.value,
      end_date: this.EducationForm.get('endDate')?.value,
      tags: this.EducationForm.get('tags')?.value,
      links: this.EducationForm.get('links')?.value,
      projects: this.EducationForm.get('projects')?.value,
    };
  }

  onSubmit() {
    if (!this.edit()) {
      this.service.post(this.mapperEducation()).subscribe({
        next: (response) => {
          this.educationCreated.emit(response.data!);
        },
      });
    } else {
      this.service.update(this.mapperEducation()).subscribe({
        next: (response) => {
          this.educationUpdated.emit(response.data!);
        },
      });
    }
    this.clean();
  }

  deleteEducation() {
    this.service.delete(this.currentEducation().id!).subscribe({
      next: () => {
        this.clean();
      },
    });
  }
}
