import { Component, inject, signal, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ServicioAnime } from '../services/anime.service';
import { Anime } from '../models/anime.model';

@Component({
  selector: 'app-inicio',
  imports: [RouterLink, FormsModule],
  templateUrl: './inicio-component.html',
  styleUrl: './inicio-component.css',
})
export class Inicio implements OnInit {
  private servicioAnime = inject(ServicioAnime);

  busqueda = signal('');
  animes = signal<Anime[]>([]);
  cargando = signal(true);
  error = signal('');
  buscado = signal(false);

  ngOnInit(): void {
    this.cargarAnimesActuales();
  }

  cargarAnimesActuales(): void {
    this.cargando.set(true);
    this.error.set('');
    this.buscado.set(false);

    this.servicioAnime.buscarAnimesAvanzado({ 
      nombre: '', 
      estado: '2',
      tipo: '1',
      clasificacion: '1',
      fechaInicio: '',
      fechaFin: '',
      ordenar: '3',
      direccion: '3'
    }).subscribe({
      next: (respuesta) => {
        this.animes.set(respuesta.data);
        this.cargando.set(false);
      },
      error: (err) => {
        console.error('Error al cargar animes:', err);
        this.error.set('Error al cargar animes. Intenta recargar la página.');
        this.cargando.set(false);
      }
    });
  }

  alBuscar(): void {
    const texto = this.busqueda().trim();
    
    if (!texto) {
      this.cargarAnimesActuales();
      return;
    }

    this.cargando.set(true);
    this.error.set('');
    this.buscado.set(true);
    this.animes.set([]);

    this.servicioAnime.buscarAnimes(texto).subscribe({
      next: (respuesta) => {
        this.animes.set(respuesta.data);
        this.cargando.set(false);
        if (respuesta.data.length === 0) {
          this.error.set('No se encontraron resultados');
        }
      },
      error: (err) => {
        console.error('Error al buscar animes:', err);
        this.error.set('Error al buscar animes. Intenta nuevamente.');
        this.cargando.set(false);
      }
    });
  }

  actualizarBusqueda(evento: Event): void {
    const input = evento.target as HTMLInputElement;
    this.busqueda.set(input.value);
  }

  limpiarBusqueda(): void {
    this.busqueda.set('');
    this.cargarAnimesActuales();
  }
}
