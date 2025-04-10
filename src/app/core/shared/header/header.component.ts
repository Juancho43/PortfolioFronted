import { Component, inject } from '@angular/core';
import { ProfileComponent } from '@modules/profile/profile/profile.component';
import { ThemeService } from '@services/utils/theme.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ProfileComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  private themeService = inject(ThemeService);

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
