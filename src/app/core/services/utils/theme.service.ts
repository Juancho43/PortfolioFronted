import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private darkThemeClass = 'dark-theme';
  private theme = new BehaviorSubject<'light' | 'dark'>(this.getDefaultColorPreference());
  theme$ = this.theme.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    // Initialize theme after checking platform
    if (isPlatformBrowser(this.platformId)) {
      this.theme.next(this.getDefaultColorPreference());
    }
  }


  toggleTheme(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const root = document.documentElement;
    if (root.classList.contains(this.darkThemeClass)) {
      root.classList.remove(this.darkThemeClass);
      this.theme.next('light');
    } else {
      root.classList.add(this.darkThemeClass);
      this.theme.next('dark');
    }
  }

  getDefaultColorPreference(): 'light' | 'dark' {
    if (!isPlatformBrowser(this.platformId)) return 'light';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  loadTheme(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    if (this.getDefaultColorPreference() === 'dark') {
      document.documentElement.classList.add(this.darkThemeClass);
      this.theme.next('dark');
    }
  }
}
