import { Component, HostListener, signal } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { NgClass, NgOptimizedImage } from '@angular/common';

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

  constructor() {
    this.checkScreenWidth(); // Initial check on component creation
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkScreenWidth();
  }

  checkScreenWidth(): void {
    this.show.set(window.innerWidth >= this.SMALL_WIDTH_THRESHOLD);
  }

  toggleNavbar() {
    this.show.update((prev) => !prev);
  }
}
