import { Component, inject } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { Project } from '../../../core/interfaces/Project';
import { TagComponent } from '../../tags/tag/tag.component';
import { TagService } from '@services/http/tag.service';
import { Tag } from '../../../core/interfaces/Tag';
import { ProjectDaoService } from '../../../core/services/DAO/project-dao.service';
import { ProjectService } from '@services/http/project.service';

@Component({
  selector: 'app-project-form',
  standalone: true,
  imports: [ReactiveFormsModule, TagComponent],
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css', '../../../core/styles/forms.css'],
})
export class ProjectFormComponent {
  private service = inject(ProjectService);
  private proyectsDAO = inject(ProjectDaoService);
  private tagsService = inject(TagService);
  tags: Tag[] = [];
  edit: boolean = false;
  currentProyect: Project = this.proyectsDAO.getEmptyProject();
  ProyectForm: FormGroup = new FormGroup({
    id: new FormControl(0),
    nombre: new FormControl('', [Validators.required]),
    descripcion: new FormControl('', [Validators.required]),
    fechaCreacion: new FormControl(new Date(), [Validators.required]),
  });

  ngOnInit() {
    this.getTagData();
    this.getCurrentProyect();
    this.clean();
  }

  getTagData() {
    // this.tagsService.getTags().subscribe({
    //   next: (x) => {
    //     // this.tags = x.tagDTOList
    //   },
    // });
  }

  getCurrentProyect() {
    this.proyectsDAO.getProject().subscribe((res) => {
      this.currentProyect = res;
      this.update();
    });
  }
  update() {
    this.mapProyecto();
    this.edit = true;
  }
  onSubmit() {
    this.mapperProyecto();
    console.log('xxxx');
    if (!this.edit) {
      // this.proyectsService.postProyecto(this.currentProyect).subscribe();
    } else {
      // this.proyectsService.putProyecto(this.currentProyect).subscribe();
    }
  }
  mapperProyecto() {
    this.currentProyect.id = this.ProyectForm.get('id')?.value;
    this.currentProyect.name = this.ProyectForm.get('nombre')?.value;
    this.currentProyect.description =
      this.ProyectForm.get('descripcion')?.value;
    this.currentProyect.created_at =
      this.ProyectForm.get('fechaCreacion')?.value;
  }
  mapProyecto() {
    this.ProyectForm.patchValue({
      id: this.currentProyect.id,
      nombre: this.currentProyect.name,
      descripcion: this.currentProyect.description,
      fechaCreacion: this.currentProyect.created_at,
    });
  }

  addTag(tag: Tag) {
    // if (!this.currentProyect.tags.find((p) => p == tag)) {
    //   this.currentProyect.tags.push(tag);
    // }
  }
  removeTag(tag: Tag) {
    // this.currentProyect.tags = this.currentProyect.tags.filter((p) => p != tag);
  }

  clean() {
    this.ProyectForm.reset();
    console.log('clena');
    this.proyectsDAO.setProject(this.proyectsDAO.getEmptyProject());
    this.edit = false;
  }
}
