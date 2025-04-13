import {Component, input} from '@angular/core';

@Component({
  selector: 'app-contact',
  imports: [],
  templateUrl: './contact.component.html',
  standalone: true,
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  readonly img = input('');
  readonly nickname = input('');
  readonly url = input('');

}
