import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '@modules/shared/header/header.component';
import { NavbarComponent } from '@modules/shared/navbar/navbar.component';
import { FooterComponent } from '@modules/shared/footer/footer.component';
import { CommonModule } from '@angular/common';
import { ThemeService } from '@services/utils/theme.service';
import { SpinnerComponent } from '@modules/shared/spinner/spinner.component';
import { UpButtonComponent } from '@modules/shared/up-button/up-button.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    NavbarComponent,
    FooterComponent,
    SpinnerComponent,
    UpButtonComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  private themeService = inject(ThemeService);

  ngOnInit(): void {
    this.themeService.loadTheme();
  }
}
