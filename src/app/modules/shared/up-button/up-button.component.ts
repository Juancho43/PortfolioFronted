import { Component, OnDestroy } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-up-button',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './up-button.component.html',
  styleUrl: './up-button.component.css',
})
export class UpButtonComponent implements OnDestroy {
  isVisible = false;
  content = document.querySelector('main')!;

  constructor() {
    this.content.addEventListener('scroll', () => {
      this.isVisible = this.content.scrollTop > 100;
    });
  }

  scrollToTop() {
    this.content.scrollTo({ top: 0, behavior: 'smooth' });
  }

  ngOnDestroy() {
    this.content.removeEventListener('scroll', () => {
      this.isVisible = this.content.scrollTop > 100;
    });
  }
}
