import { Component, signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-up-button',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './up-button.component.html',
  styleUrl: './up-button.component.css',
})
export class UpButtonComponent {
  isVisible = signal(window.scrollY > 100);


  constructor() {
    window.addEventListener('scroll', () => {
      this.isVisible.set(window.scrollY > 100);
    });
  }
  scrollToTop() {
    window.scrollTo({ top:0, left:0, behavior:'smooth' });
  }


}
