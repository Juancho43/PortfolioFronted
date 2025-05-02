import { AfterViewInit, Component, effect, inject, input } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Project } from '@model/Project';
import { Tag } from '@model/Tag';
import { ProjectDaoService } from '@dao/project-dao.service';
import { ProjectService } from '@services/http/project.service';
import { Link } from '@model/Link';
import { JoinTagComponent } from '@modules/tags/join-tag/join-tag.component';
import { JoinLinkComponent } from '@modules/links/join-link/join-link.component';

@Component({
  selector: 'app-project-form',
  standalone: true,
  imports: [ReactiveFormsModule, JoinTagComponent, JoinLinkComponent],
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css', '../../../core/styles/forms.css'],
})
export class ProjectFormComponent implements AfterViewInit {
  private service = inject(ProjectService);
  private projectDaoService = inject(ProjectDaoService);
  readonly currentProject = input.required<Project>();

  edit = false;

  projectForm: FormGroup = new FormGroup({
    id: new FormControl(0),
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    tags: new FormArray<FormControl<number[]>>([]),
    links: new FormArray<FormControl<number[]>>([]),
  });

  constructor() {
    effect(() => {
      this.currentProject();
      this.update();
    });
  }

  ngAfterViewInit() {
    this.clean();
  }

  onSubmit() {
    if (!this.edit) {
      this.service.post(this.mapperProject()).subscribe();
    } else {
      this.service.update(this.mapperProject()).subscribe();
    }
    this.clean();
  }

  mapperProject() {
    return {
      id: this.projectForm.get('id')?.value,
      name: this.projectForm.get('name')?.value,
      description: this.projectForm.get('description')?.value,
      tags: this.projectForm.get('tags')?.value,
      links: this.projectForm.get('links')?.value,
    };
  }

  mapProject() {
    this.projectForm.patchValue({
      id: this.currentProject().id,
      name: this.currentProject().name,
      description: this.currentProject().description,
      tags: this.currentProject().tags!,
      links: this.currentProject().links!!,
    });
    this.patchTagsValues();
    this.patchLinksValues();
  }

  patchTagsValues(tags: Tag[] = this.currentProject().tags!) {
    const tagsArray = this.projectForm.get('tags') as FormArray;
    tagsArray.clear();
    tags.forEach((tag) => {
      tagsArray.push(new FormControl(tag.id));
    });
  }

  patchLinksValues(links: Link[] = this.currentProject().links!) {
    const linksArray = this.projectForm.get('links') as FormArray;
    linksArray.clear();
    links.forEach((link) => {
      linksArray.push(new FormControl(link.id));
    });
  }
  clean() {
    this.projectForm.reset();
    this.projectDaoService.setProject(this.projectDaoService.getEmptyProject());
    this.edit = false;
  }

  update() {
    this.mapProject();
    this.edit = true;
  }
  deleteProject() {
    this.service.delete(this.currentProject().id!).subscribe({
      next: () => {
        this.clean();
      },
      error: (error) => {
        console.error('Error deleting project:', error);
      },
    });
  }
}
