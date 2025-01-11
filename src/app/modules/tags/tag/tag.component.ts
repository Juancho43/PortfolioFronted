import {Component, Input} from '@angular/core';

import {Tag} from "../../../core/interfaces/Tag";
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-tag',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './tag.component.html',
  styleUrl: './tag.component.css'
})
export class TagComponent {
@Input() tag : Tag = {
  id: 0,
  name: '',
  created_at: new Date(),
  updated_at: new Date()
};

  isClicked = false;

  toggleClass() {
    this.isClicked = !this.isClicked;
  }

}
