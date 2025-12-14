import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ServicioTema } from '../services/servicio-tema';

@Component({
  selector: 'app-cabecera',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './cabecera.html',
  styleUrl: './cabecera.css',
})
export class Cabecera {
  servicioTema = inject(ServicioTema);

  cambiarTema(): void {
    this.servicioTema.cambiarTema();
  }

  obtenerTextoBotonTema(): string {
    return this.servicioTema.modoOscuro() ? '☀️ Claro' : '🌙 Oscuro';
  }
}
