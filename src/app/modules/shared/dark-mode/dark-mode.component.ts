import { Component, inject, OnInit } from '@angular/core';
import { ThemeService } from '@services/utils/theme.service';

@Component({
  selector: 'app-dark-mode',
  standalone: true,
  imports: [],
  templateUrl: './dark-mode.component.html',
  styleUrl: './dark-mode.component.scss',
})
export class DarkModeComponent implements OnInit {
  private themeService = inject(ThemeService);
  url = '';

  ngOnInit(): void {
    this.themeService.theme$.subscribe((res) => (this.url = res === 'dark' ? 'asset/light.svg' : 'asset/dark.svg'));
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
