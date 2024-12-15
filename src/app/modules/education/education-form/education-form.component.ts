import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {EducationService} from "../../../core/services/education.service";
import {Education} from "../../../core/interfaces/Education";

@Component({
  selector: 'app-education-form',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './education-form.component.html',
  styleUrls: ['./education-form.component.css','../../../core/styles/forms.css']
})
export class EducationFormComponent {
  private service = inject(EducationService);
  edit : boolean = false;
  currentEducation : Education = {
    id: 0,
    nombre: '',
    resumen: '',
    fechaInicio: new Date(),
    fechaFinalizacion: new Date(),
    tipo: ''
  };
  EducationForm : FormGroup = new FormGroup({
    id : new FormControl(0),
    nombre : new FormControl('', [Validators.required]),
    resumen: new FormControl('', [Validators.required]),
    tipo: new FormControl('', [Validators.required]),
    fechaInicio: new FormControl(new Date(), [Validators.required]),
    fechaFinalizacion: new FormControl(new Date(), [Validators.required]),
  })

  ngOnInit () {

  }


  onSubmit(){
    this.mapperProyecto();
    if(!this.edit){
      this.service.post(this.currentEducation).subscribe();
    }
  }
  mapperProyecto(){
    this.currentEducation.id = this.EducationForm.get("id")?.value;
    this.currentEducation.nombre = this.EducationForm.get("nombre")?.value;
    this.currentEducation.resumen = this.EducationForm.get("resumen")?.value;
    this.currentEducation.fechaInicio = this.EducationForm.get("fechaInicio")?.value;
    this.currentEducation.fechaFinalizacion = this.EducationForm.get("fechaFinalizacion")?.value;
    this.currentEducation.tipo = this.EducationForm.get("tipo")?.value;
  }
}
