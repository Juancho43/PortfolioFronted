import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private darkThemeClass = 'dark-theme';

  toggleTheme(): void {
    const root = document.documentElement;
    if (root.classList.contains(this.darkThemeClass)) {
      root.classList.remove(this.darkThemeClass);
      localStorage.setItem('theme', 'light');
    } else {
      root.classList.add(this.darkThemeClass);
      localStorage.setItem('theme', 'dark');
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
