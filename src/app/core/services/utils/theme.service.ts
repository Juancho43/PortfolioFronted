import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private darkThemeClass = 'dark-theme';
  private theme = new BehaviorSubject<'light' | 'dark'>(this.getDefaultColorPreference());
  theme$ = this.theme.asObservable();

  toggleTheme(): void {
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
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  loadTheme(): void {
    if (this.getDefaultColorPreference() === 'dark') {
      document.documentElement.classList.add(this.darkThemeClass);
    }
  }
}
