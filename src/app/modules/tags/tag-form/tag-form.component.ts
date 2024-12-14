import {Component, inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {TagsService} from "../../../core/services/tags.service";
import {Tag} from "../../../core/interfaces/Tag";

@Component({
  selector: 'app-tag-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './tag-form.component.html',
  styleUrls: ['./tag-form.component.css','../../../core/styles/forms.css']
})
export class TagFormComponent implements OnInit{
  private tagService = inject(TagsService);
  edit : boolean = false;
  currentTag : Tag = {id:0,nombre:""};
  TagForm : FormGroup = new FormGroup({
    id : new FormControl(0),
    name : new FormControl('', [Validators.required]),
  })

  ngOnInit () {

  }


  onSubmit(){
    this.mapperTag();
    if(!this.edit){
      console.log(this.currentTag);
      this.tagService.postTag(this.currentTag).subscribe();
    }
  }
  mapperTag(){
    this.currentTag.id = this.TagForm.get("id")?.value;
    this.currentTag.nombre = this.TagForm.get("name")?.value;
  }

}
