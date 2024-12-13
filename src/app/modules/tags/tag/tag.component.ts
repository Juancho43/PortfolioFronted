import {Component, Input} from '@angular/core';
import {MatChipsModule} from "@angular/material/chips";
import {Tag} from "../../../core/interfaces/Tag";

@Component({
  selector: 'app-tag',
  standalone: true,
  imports: [
    MatChipsModule
  ],
  templateUrl: './tag.component.html',
  styleUrl: './tag.component.css'
})
export class TagComponent {
@Input() tag : Tag = {id:0,nombre:""};
}
