import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '@core/shared/header/header.component';
import { NavbarComponent } from '@core/shared/navbar/navbar.component';
import { FooterComponent } from '@core/shared/footer/footer.component';
import { CommonModule } from '@angular/common';
import { ThemeService } from '@services/utils/theme.service';
import {SpinnerComponent} from '@core/shared/spinner/spinner.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, NavbarComponent, FooterComponent, SpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  private themeService = inject(ThemeService);

  ngOnInit(): void {
    this.themeService.loadTheme();
  }
}
