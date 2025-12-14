import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ServicioAnime } from '../services/servicio-anime';
import { ServicioMiLista } from '../services/servicio-mi-lista';
import { DetalleAnime as DetalleAnimeModelo, Episodio, Resena, EstadoAnime } from '../models/modelo-anime';

@Component({
  selector: 'app-detalle-anime',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './detalle-anime.html',
  styleUrl: './detalle-anime.css',
})
export class DetalleAnime implements OnInit {
  private ruta = inject(ActivatedRoute);
  private servicioAnime = inject(ServicioAnime);
  servicioMiLista = inject(ServicioMiLista);

  anime = signal<DetalleAnimeModelo | null>(null);
  episodios = signal<Episodio[]>([]);
  resenas = signal<Resena[]>([]);
  cargando = signal(true);
  error = signal('');
  
  cargandoEpisodios = signal(false);
  cargandoResenas = signal(false);
  
  estadoSeleccionado = signal<EstadoAnime>('Pendiente');

  ngOnInit(): void {
    this.ruta.params.subscribe(parametros => {
      const id = +parametros['id'];
      if (id) {
        this.cargarDetalleAnime(id);
        this.cargarEpisodios(id);
        this.cargarResenas(id);
      }
    });
  }

  private cargarDetalleAnime(id: number): void {
    this.cargando.set(true);
    this.error.set('');

    this.servicioAnime.obtenerAnimePorId(id).subscribe({
      next: (respuesta) => {
        this.anime.set(respuesta.data);
        this.cargando.set(false);
        
        const enLista = this.servicioMiLista.obtenerAnimeDeLista(id);
        if (enLista) {
          this.estadoSeleccionado.set(enLista.estado);
        }
      },
      error: (err) => {
        console.error('Error al cargar anime:', err);
        this.error.set('Error al cargar el anime. Intenta nuevamente.');
        this.cargando.set(false);
      }
    });
  }

  private cargarEpisodios(id: number): void {
    this.cargandoEpisodios.set(true);
    
    this.servicioAnime.obtenerEpisodios(id).subscribe({
      next: (respuesta) => {
        this.episodios.set(respuesta.data);
        this.cargandoEpisodios.set(false);
      },
      error: (err) => {
        console.error('Error al cargar episodios:', err);
        this.cargandoEpisodios.set(false);
      }
    });
  }

  private cargarResenas(id: number): void {
    this.cargandoResenas.set(true);
    
    this.servicioAnime.obtenerResenas(id).subscribe({
      next: (respuesta) => {
        this.resenas.set(respuesta.data);
        this.cargandoResenas.set(false);
      },
      error: (err) => {
        console.error('Error al cargar reseñas:', err);
        this.cargandoResenas.set(false);
      }
    });
  }

  estaEnLista(): boolean {
    const anime = this.anime();
    return anime ? this.servicioMiLista.estaEnLista(anime.mal_id) : false;
  }

  esFavorito(): boolean {
    const anime = this.anime();
    if (!anime) return false;
    const item = this.servicioMiLista.obtenerAnimeDeLista(anime.mal_id);
    return item?.esFavorito || false;
  }

  agregarALista(): void {
    const anime = this.anime();
    if (anime) {
      this.servicioMiLista.agregarAnime(anime, this.estadoSeleccionado());
    }
  }

  actualizarEstado(): void {
    const anime = this.anime();
    if (anime) {
      this.servicioMiLista.actualizarEstado(anime.mal_id, this.estadoSeleccionado());
    }
  }

  cambiarFavorito(): void {
    const anime = this.anime();
    if (anime) {
      this.servicioMiLista.cambiarFavorito(anime.mal_id);
    }
  }

  eliminarDeLista(): void {
    const anime = this.anime();
    if (anime && confirm('¿Estás seguro de eliminar este anime de tu lista?')) {
      this.servicioMiLista.eliminarAnime(anime.mal_id);
    }
  }

  alCambiarEstado(evento: Event): void {
    const select = evento.target as HTMLSelectElement;
    this.estadoSeleccionado.set(select.value as EstadoAnime);
    if (this.estaEnLista()) {
      this.actualizarEstado();
    }
  }

  recortarTexto(texto: string, longitudMaxima: number): string {
    if (!texto) return '';
    return texto.length > longitudMaxima ? texto.substring(0, longitudMaxima) + '...' : texto;
  }
}
