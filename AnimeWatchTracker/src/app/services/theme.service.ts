import { Injectable, signal, effect } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServicioTema {
  private readonly CLAVE_ALMACENAMIENTO = 'animeWatchTracker_tema';
  
  modoOscuro = signal<boolean>(false);

  constructor() {
    this.cargarTema();
    
    effect(() => {
      const esOscuro = this.modoOscuro();
      this.aplicarTema(esOscuro);
      this.guardarTema(esOscuro);
    });
  }

  private cargarTema(): void {
    const guardado = localStorage.getItem(this.CLAVE_ALMACENAMIENTO);
    if (guardado !== null) {
      this.modoOscuro.set(guardado === 'oscuro');
    } else {
      const prefiereOscuro = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.modoOscuro.set(prefiereOscuro);
    }
  }

  private guardarTema(esOscuro: boolean): void {
    localStorage.setItem(this.CLAVE_ALMACENAMIENTO, esOscuro ? 'oscuro' : 'claro');
  }

  private aplicarTema(esOscuro: boolean): void {
    if (esOscuro) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }

  cambiarTema(): void {
    this.modoOscuro.update(actual => !actual);
  }
}
