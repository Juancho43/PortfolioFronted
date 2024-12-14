import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {TagsService} from "../../../core/services/tags.service";
import {Tag} from "../../../core/interfaces/Tag";
import {ProyectsService} from "../../../core/services/proyects.service";
import {Proyecto} from "../../../core/interfaces/Proyecto";

@Component({
  selector: 'app-proyect-form',
  standalone: true,
    imports: [
        ReactiveFormsModule
    ],
  templateUrl: './proyect-form.component.html',
  styleUrls: ['./proyect-form.component.css','../../../core/styles/forms.css']
})
export class ProyectFormComponent {
  private proyectsService = inject(ProyectsService);
  edit : boolean = false;
  currentProyect : Proyecto = {id:0, nombre:"", descripcion: "",  fechaCreacion: new Date(), tags: []};
  ProyectForm : FormGroup = new FormGroup({
    id : new FormControl(0),
    nombre : new FormControl('', [Validators.required]),
    descripcion: new FormControl('', [Validators.required]),
    fechaCreacion: new FormControl(new Date(), [Validators.required]),
    tags: new FormControl([], Validators.required)
  })

  ngOnInit () {

  }


  onSubmit(){
    this.mapperProyecto();
    if(!this.edit){
      console.log(this.currentProyect);
      this.proyectsService.postProyecto(this.currentProyect).subscribe();
    }
  }
  mapperProyecto(){
    this.currentProyect.id = this.ProyectForm.get("id")?.value;
    this.currentProyect.nombre = this.ProyectForm.get("nombre")?.value;
    this.currentProyect.descripcion = this.ProyectForm.get("descripcion")?.value;
    this.currentProyect.fechaCreacion = this.ProyectForm.get("fechaCreacion")?.value;
  }
}
