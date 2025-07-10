import { Component, Inject, OnDestroy, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-up-button',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './up-button.component.html',
  styleUrl: './up-button.component.scss',
})
export class UpButtonComponent implements OnDestroy{
  isVisible = signal(false);
  scrollHandler: (() => void) | null = null;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    if (isPlatformBrowser(this.platformId)) {
      // Initialize with current scroll position
      this.isVisible.set(window.scrollY > 100);

      // Create the handler function
      this.scrollHandler = () => {
        this.isVisible.set(window.scrollY > 100);
      };

      // Add event listener
      window.addEventListener('scroll', this.scrollHandler);
    }
  }

  scrollToTop() {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
  }

  ngOnDestroy() {
    // Clean up event listener
    if (isPlatformBrowser(this.platformId) && this.scrollHandler) {
      window.removeEventListener('scroll', this.scrollHandler);
    }
  }
}
