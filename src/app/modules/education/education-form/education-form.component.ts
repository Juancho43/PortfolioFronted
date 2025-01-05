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
    name: '',
    description: '',
    startDate: new Date(),
    endDate: new Date(),
    type: '',
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null
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
    this.currentEducation.name = this.EducationForm.get("nombre")?.value;
    this.currentEducation.description = this.EducationForm.get("resumen")?.value;
    this.currentEducation.startDate = this.EducationForm.get("fechaInicio")?.value;
    this.currentEducation.endDate = this.EducationForm.get("fechaFinalizacion")?.value;
    this.currentEducation.type = this.EducationForm.get("tipo")?.value;
  }
}
