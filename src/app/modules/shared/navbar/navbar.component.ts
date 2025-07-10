import { Component, HostListener, Inject, PLATFORM_ID, signal } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { isPlatformBrowser, NgClass, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterModule, NgClass, NgOptimizedImage],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  show = signal<boolean>(true);
  private readonly SMALL_WIDTH_THRESHOLD = 767; // Define the small width threshold


  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    if (isPlatformBrowser(this.platformId)) {
      this.checkScreenWidth(); // Initial check only on client-side
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    if (isPlatformBrowser(this.platformId)) {
      this.checkScreenWidth();
    }
  }

  checkScreenWidth(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.show.set(window.innerWidth >= this.SMALL_WIDTH_THRESHOLD);
    }
  }

  toggleNavbar() {
    this.show.update((prev) => !prev);
  }
}
