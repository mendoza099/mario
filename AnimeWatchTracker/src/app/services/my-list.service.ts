import { Injectable, signal } from '@angular/core';
import { Anime, AnimeEnLista, EstadoAnime } from '../models/anime.model';

@Injectable({
  providedIn: 'root'
})
export class ServicioMiLista {
  private readonly CLAVE_ALMACENAMIENTO = 'animeWatchTracker_miLista';
  
  miLista = signal<AnimeEnLista[]>([]);

  constructor() {
    this.cargarDesdeAlmacenamiento();
  }

  private cargarDesdeAlmacenamiento(): void {
    const guardado = localStorage.getItem(this.CLAVE_ALMACENAMIENTO);
    if (guardado) {
      try {
        const lista = JSON.parse(guardado);
        this.miLista.set(lista);
      } catch (error) {
        console.error('Error al cargar desde localStorage:', error);
        this.miLista.set([]);
      }
    }
  }

  private guardarEnAlmacenamiento(): void {
    localStorage.setItem(this.CLAVE_ALMACENAMIENTO, JSON.stringify(this.miLista()));
  }

  agregarAnime(anime: Anime, estado: EstadoAnime = 'Pendiente'): void {
    const listaActual = this.miLista();
    const existe = listaActual.find(item => item.anime.mal_id === anime.mal_id);
    
    if (!existe) {
      const nuevoAnime: AnimeEnLista = {
        anime,
        estado,
        esFavorito: false,
        fechaAgregado: new Date().toISOString()
      };
      this.miLista.set([...listaActual, nuevoAnime]);
      this.guardarEnAlmacenamiento();
    }
  }

  eliminarAnime(idAnime: number): void {
    const listaActual = this.miLista();
    this.miLista.set(listaActual.filter(item => item.anime.mal_id !== idAnime));
    this.guardarEnAlmacenamiento();
  }

  actualizarEstado(idAnime: number, estado: EstadoAnime): void {
    const listaActual = this.miLista();
    const actualizada = listaActual.map(item => 
      item.anime.mal_id === idAnime ? { ...item, estado } : item
    );
    this.miLista.set(actualizada);
    this.guardarEnAlmacenamiento();
  }

  cambiarFavorito(idAnime: number): void {
    const listaActual = this.miLista();
    const actualizada = listaActual.map(item => 
      item.anime.mal_id === idAnime ? { ...item, esFavorito: !item.esFavorito } : item
    );
    this.miLista.set(actualizada);
    this.guardarEnAlmacenamiento();
  }

  estaEnLista(idAnime: number): boolean {
    return this.miLista().some(item => item.anime.mal_id === idAnime);
  }

  obtenerAnimeDeLista(idAnime: number): AnimeEnLista | undefined {
    return this.miLista().find(item => item.anime.mal_id === idAnime);
  }

  obtenerPorEstado(estado: EstadoAnime): AnimeEnLista[] {
    return this.miLista().filter(item => item.estado === estado);
  }

  obtenerFavoritos(): AnimeEnLista[] {
    return this.miLista().filter(item => item.esFavorito);
  }

  obtenerTodos(): AnimeEnLista[] {
    return this.miLista();
  }
}
