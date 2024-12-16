import {Component, inject} from '@angular/core';
import {FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ProyectsService} from "../../../core/services/proyects.service";
import {Proyecto} from "../../../core/interfaces/Proyecto";
import {TagComponent} from "../../tags/tag/tag.component";
import {TagsService} from "../../../core/services/tags.service";
import {Tag} from "../../../core/interfaces/Tag";
import {JsonPipe} from "@angular/common";

@Component({
  selector: 'app-proyect-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TagComponent,
    JsonPipe
  ],
  templateUrl: './proyect-form.component.html',
  styleUrls: ['./proyect-form.component.css','../../../core/styles/forms.css']
})
export class ProyectFormComponent {
  private proyectsService = inject(ProyectsService);
  private tagsService = inject(TagsService);
  tags : Tag[] = [];
  edit : boolean = false;
  currentProyect : Proyecto = {id:0, nombre:"", descripcion: "",  fechaCreacion: new Date(), tags: []};
  ProyectForm : FormGroup = new FormGroup({
    id : new FormControl(0),
    nombre : new FormControl('', [Validators.required]),
    descripcion: new FormControl('', [Validators.required]),
    fechaCreacion: new FormControl(new Date(), [Validators.required]),
  })

  ngOnInit () {
  this.getData();
  }

  getData(){
    this.tagsService.getTags().subscribe({
      next : (x) => {
        this.tags = x.tagDTOList;
      }
    })
  }
  onSubmit(){
    this.mapperProyecto();
    if(!this.edit){
      this.proyectsService.postProyecto(this.currentProyect).subscribe();
    }
  }
  mapperProyecto(){
    this.currentProyect.id = this.ProyectForm.get("id")?.value;
    this.currentProyect.nombre = this.ProyectForm.get("nombre")?.value;
    this.currentProyect.descripcion = this.ProyectForm.get("descripcion")?.value;
    this.currentProyect.fechaCreacion = this.ProyectForm.get("fechaCreacion")?.value;
  }
  addTag(tag : Tag){
    if(!this.currentProyect.tags.find(p => p == tag)){
      this.currentProyect.tags.push(tag);
    }
  }
  removeTag(tag : Tag){
    this.currentProyect.tags = this.currentProyect.tags.filter(p => p != tag);
  }

}
