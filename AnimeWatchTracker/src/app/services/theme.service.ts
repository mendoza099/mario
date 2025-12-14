import { Injectable, signal, effect } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly STORAGE_KEY = 'animeWatchTracker_theme';
  
  isDarkMode = signal<boolean>(false);

  constructor() {
    this.loadTheme();
    
    effect(() => {
      const isDark = this.isDarkMode();
      this.applyTheme(isDark);
      this.saveTheme(isDark);
    });
  }

  private loadTheme(): void {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored !== null) {
      this.isDarkMode.set(stored === 'dark');
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.isDarkMode.set(prefersDark);
    }
  }

  private saveTheme(isDark: boolean): void {
    localStorage.setItem(this.STORAGE_KEY, isDark ? 'dark' : 'light');
  }

  private applyTheme(isDark: boolean): void {
    if (isDark) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }

  toggleTheme(): void {
    this.isDarkMode.update(current => !current);
  }
}
