import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { EducationService } from '../../../core/services/education.service';
import { Education } from '../../../core/interfaces/Education';
import { EducationDaoService } from '../../../core/DAO/education-dao.service';

@Component({
  selector: 'app-education-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './education-form.component.html',
  styleUrls: [
    './education-form.component.css',
    '../../../core/styles/forms.css',
  ],
})
export class EducationFormComponent {
  private service = inject(EducationService);
  private dao = inject(EducationDaoService);
  edit: boolean = false;

  currentEducation: Education = this.dao.getEmptyEducation();

  EducationForm: FormGroup = new FormGroup({
    id: new FormControl(0),
    nombre: new FormControl('', [Validators.required]),
    resumen: new FormControl('', [Validators.required]),
    tipo: new FormControl('', [Validators.required]),
    fechaInicio: new FormControl(new Date(), [Validators.required]),
    fechaFinalizacion: new FormControl(new Date(), [Validators.required]),
  });

  ngOnInit() {
    this.dao.getEducation().subscribe((res) => {
      this.currentEducation = res;
      this.setForm();
    });
  }

  onSubmit() {
    this.mapperProyecto();
    if (!this.edit) {
      this.service.post(this.currentEducation).subscribe();
    }
  }

  setForm() {
    this.EducationForm.patchValue({
      id: this.currentEducation.id,
      nombre: this.currentEducation.name,
      resumen: this.currentEducation.description,
      fechaInicio: this.currentEducation.startDate,
      fechaFinalizacion: this.currentEducation.endDate,
      tipo: this.currentEducation.type,
    });
  }

  mapperProyecto() {
    this.currentEducation.id = this.EducationForm.get('id')?.value;
    this.currentEducation.name = this.EducationForm.get('nombre')?.value;
    this.currentEducation.description =
      this.EducationForm.get('resumen')?.value;
    this.currentEducation.startDate =
      this.EducationForm.get('fechaInicio')?.value;
    this.currentEducation.endDate =
      this.EducationForm.get('fechaFinalizacion')?.value;
    this.currentEducation.type = this.EducationForm.get('tipo')?.value;
  }
}
