import {Component, inject} from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./core/shared/header/header.component";
import { NavbarComponent } from "./core/shared/navbar/navbar.component";
import { FooterComponent } from "./core/shared/footer/footer.component";
import { CommonModule } from '@angular/common';
import {LoadingService} from './core/services/loading.service';
import {SpinnerComponent} from './core/shared/spinner/spinner.component';
import {MatProgressSpinner} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, HeaderComponent, NavbarComponent, FooterComponent, SpinnerComponent, MatProgressSpinner],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'portfolio';
  private loadingService = inject(LoadingService);
  isLoading$ = this.loadingService.loading$;
}
