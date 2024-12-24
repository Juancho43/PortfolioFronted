import {Component, inject, Input} from '@angular/core';
import {Tag} from "../../../core/interfaces/Tag";
import {ProyectsService} from "../../../core/services/proyects.service";
import {TagsService} from "../../../core/services/tags.service";
import {ProyectComponent} from "../../proyects/proyect/proyect.component";
import {JsonPipe} from "@angular/common";
import {TagComponent} from "../tag/tag.component";

@Component({
  selector: 'app-tag-list',
  standalone: true,
  imports: [
    ProyectComponent,
    JsonPipe,
    TagComponent
  ],
  templateUrl: './tag-list.component.html',
  styleUrl: './tag-list.component.css'
})
export class TagListComponent {
  private tagsService = inject(TagsService);
  @Input() tags : Tag[] = [];
  @Input() load : boolean = true;
  ngOnInit() {
    if (this.load){
      this.getData();
    }
  }

  getData(){
    this.tagsService.getTags().subscribe({
      next : (x) => {
        this.tags = x.tagDTOList;
      }
    })
  }
}
