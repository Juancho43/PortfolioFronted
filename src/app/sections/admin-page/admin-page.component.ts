import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css', '../../core/styles/navbar.css'],
})
export class AdminPageComponent {}
