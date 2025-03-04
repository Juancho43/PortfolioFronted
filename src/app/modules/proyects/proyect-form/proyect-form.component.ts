import {Component, inject} from '@angular/core';
import {FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ProyectsService} from "../../../core/services/proyects.service";
import {Proyecto} from "../../../core/interfaces/Proyecto";
import {TagComponent} from "../../tags/tag/tag.component";
import {TagsService} from "../../../core/services/tags.service";
import {Tag} from "../../../core/interfaces/Tag";
import {ProyectDaoService} from '../../../core/DAO/proyect-dao.service';

@Component({
  selector: 'app-proyect-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TagComponent,
  ],
  templateUrl: './proyect-form.component.html',
  styleUrls: ['./proyect-form.component.css','../../../core/styles/forms.css']
})
export class ProyectFormComponent {
  private proyectsService = inject(ProyectsService);
  private proyectsDAO = inject(ProyectDaoService);
  private tagsService = inject(TagsService);
  tags : Tag[] = [];
  edit : boolean = false;
  currentProyect : Proyecto = this.proyectsDAO.getEmptyProyecto();
  ProyectForm : FormGroup = new FormGroup({
    id : new FormControl(0),
    nombre : new FormControl('', [Validators.required]),
    descripcion: new FormControl('', [Validators.required]),
    fechaCreacion: new FormControl(new Date(), [Validators.required]),
  })

  ngOnInit () {
    this.getTagData();
    this.getCurrentProyect();
    this.clean();
  }

  getTagData(){
    this.tagsService.getTags().subscribe({
      next : (x) => {
        this.tags = x.data!;
      }
    })
  }

 getCurrentProyect(){
    this.proyectsDAO.getProyecto().subscribe(res=>{
      this.currentProyect = res;
      this.update();

      }
    )
 }
update(){
  this.mapProyecto();
  this.edit = true;
}
  onSubmit(){
    this.mapperProyecto();
    console.log("xxxx")
    if(!this.edit){
      this.proyectsService.postProyecto(this.currentProyect).subscribe();
    }else{
      this.proyectsService.putProyecto(this.currentProyect).subscribe();
    }
  }
  mapperProyecto(){
    this.currentProyect.id = this.ProyectForm.get("id")?.value;
    this.currentProyect.name = this.ProyectForm.get("nombre")?.value;
    this.currentProyect.description = this.ProyectForm.get("descripcion")?.value;
    this.currentProyect.created_at = this.ProyectForm.get("fechaCreacion")?.value;
  }
  mapProyecto(){
    this.ProyectForm.patchValue({
      id:this.currentProyect.id,
      nombre : this.currentProyect.name,
      descripcion : this.currentProyect.description,
      fechaCreacion : this.currentProyect.created_at
    })
  }

  addTag(tag : Tag){
    if(!this.currentProyect.tags.find(p => p == tag)){
      this.currentProyect.tags.push(tag);
    }
  }
  removeTag(tag : Tag){
    this.currentProyect.tags = this.currentProyect.tags.filter(p => p != tag);
  }

  clean(){
    this.ProyectForm.reset();
    console.log("clena")
    this.proyectsDAO.setProyecto(this.proyectsDAO.getEmptyProyecto());
    this.edit=false;
  }
}
