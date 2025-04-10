import { Component } from '@angular/core';
import { ProfileComponent } from '@modules/profile/profile/profile.component';
import { DarkModeComponent } from '@core/shared/dark-mode/dark-mode.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ProfileComponent, DarkModeComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {}
