import { Component, HostListener, signal } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css', '../../styles/navbar.css'],
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
