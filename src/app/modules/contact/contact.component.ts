import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-contact',
  imports: [],
  templateUrl: './contact.component.html',
  standalone: true,
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  @Input() img  = '';
  @Input() nickname  = '';
  @Input() url  = '';

}
