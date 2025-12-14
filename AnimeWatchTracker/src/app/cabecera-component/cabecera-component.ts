import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-cabecera-component',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './cabecera-component.html',
  styleUrl: './cabecera-component.css',
})
export class CabeceraComponent {
  themeService = inject(ThemeService);

  cambiarTema(): void {
    this.themeService.toggleTheme();
  }

  getThemeButtonText(): string {
    return this.themeService.isDarkMode() ? '☀️ Claro' : '🌙 Oscuro';
  }
}
