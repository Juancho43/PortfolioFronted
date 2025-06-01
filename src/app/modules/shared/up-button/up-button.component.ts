import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-up-button',
  standalone: true,
  imports: [],
  templateUrl: './up-button.component.html',
  styleUrl: './up-button.component.css'
})
export class UpButtonComponent {
  isVisible = true;

  @HostListener('window:scroll')
  onWindowScroll() {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    this.isVisible = scrollTop > 300;
  }
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
