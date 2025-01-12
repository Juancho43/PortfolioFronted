import {Component, Input} from '@angular/core';
import {Tag} from '../../../core/interfaces/Tag';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-tag-option',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './tag-option.component.html',
  styleUrl: './tag-option.component.css'
})
export class TagOptionComponent {
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
