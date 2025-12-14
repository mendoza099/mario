import { Component, inject, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ServicioMiLista } from '../services/servicio-mi-lista';
import { AnimeEnLista, EstadoAnime } from '../models/modelo-anime';

type TipoFiltro = 'Todos' | 'Favoritos' | 'Pendiente' | 'Viendo' | 'Completado' | 'Abandonado';

@Component({
  selector: 'app-mi-lista',
  imports: [RouterLink],
  templateUrl: './mi-lista.html',
  styleUrl: './mi-lista.css',
})
export class MiLista {
  servicioMiLista = inject(ServicioMiLista);
  
  filtroActivo = signal<TipoFiltro>('Todos');

  listaFiltrada = computed(() => {
    const filtro = this.filtroActivo();
    const todosLosAnimes = this.servicioMiLista.miLista();

    if (filtro === 'Todos') return todosLosAnimes;
    if (filtro === 'Favoritos') return this.servicioMiLista.obtenerFavoritos();
    return this.servicioMiLista.obtenerPorEstado(filtro as EstadoAnime);
  });

  estadisticas = computed(() => {
    const lista = this.servicioMiLista.miLista();
    return {
      total: lista.length,
      favoritos: this.servicioMiLista.obtenerFavoritos().length,
      pendiente: this.servicioMiLista.obtenerPorEstado('Pendiente').length,
      viendo: this.servicioMiLista.obtenerPorEstado('Viendo').length,
      completado: this.servicioMiLista.obtenerPorEstado('Completado').length,
      abandonado: this.servicioMiLista.obtenerPorEstado('Abandonado').length,
    };
  });

  cambiarFiltro(filtro: TipoFiltro): void {
    this.filtroActivo.set(filtro);
  }

  eliminarAnime(idAnime: number): void {
    if (confirm('¿Estás seguro de eliminar este anime de tu lista?')) {
      this.servicioMiLista.eliminarAnime(idAnime);
    }
  }

  cambiarFavorito(idAnime: number): void {
    this.servicioMiLista.cambiarFavorito(idAnime);
  }
}
