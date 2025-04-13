import {Component, input} from '@angular/core';
import {Link} from '@model/Link';

@Component({
  selector: 'app-link',
  standalone: true,
  imports: [],
  templateUrl: './link.component.html',
  styleUrl: './link.component.css',
})
export class LinkComponent {
  readonly link = input<Link>({
    id: 0,
    name: '',
    link: '',
});
}
