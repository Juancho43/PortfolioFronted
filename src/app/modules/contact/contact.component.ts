import { Component, input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-contact',
  imports: [
    NgOptimizedImage,
  ],
  templateUrl: './contact.component.html',
  standalone: true,
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  readonly img = input('');
  readonly nickname = input('');
  readonly url = input('');
}
