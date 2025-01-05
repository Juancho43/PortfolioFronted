import {Component, Input} from '@angular/core';
import {Proyecto} from "../../../core/interfaces/Proyecto";
import {TagListComponent} from "../../tags/tag-list/tag-list.component";
import {TagComponent} from "../../tags/tag/tag.component";
import {Tag} from '../../../core/interfaces/Tag';

@Component({
  selector: 'app-proyect-card',
  standalone: true,
    imports: [
        TagListComponent,
        TagComponent
    ],
  templateUrl: './proyect-card.component.html',
  styleUrl: './proyect-card.component.css'
})
export class ProyectCardComponent {
  @Input() Proyect : Proyecto = {
    created_at: new Date(), description: '', id: 0, name: '', tags: [], updated_at: new Date()

  }
  tags: Tag[] = [];

  ngOnInit(){
  this.tags = this.Proyect.tags.slice(0, 3);

  }


}
