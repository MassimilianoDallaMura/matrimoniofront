// theme.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private darkMode = false;

  constructor() {
    const savedTheme = localStorage.getItem('dark-mode');
    if (savedTheme) {
      this.darkMode = JSON.parse(savedTheme);
      this.updateBodyClass();
    }
  }

  toggleTheme(): void {
    this.darkMode = !this.darkMode;
    localStorage.setItem('dark-mode', JSON.stringify(this.darkMode));
    this.updateBodyClass();
  }

  isDarkMode(): boolean {
    return this.darkMode;
  }

  private updateBodyClass(): void {
    if (this.darkMode) {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
      document.body.classList.remove('dark-mode');
    }
  }
}
