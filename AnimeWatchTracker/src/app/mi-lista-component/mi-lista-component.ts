import { Component, inject, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MyListService } from '../services/my-list.service';
import { MyAnimeListItem, AnimeStatus } from '../models/anime.model';

type FilterType = 'Todos' | 'Favoritos' | 'Pendiente' | 'Viendo' | 'Completado' | 'Abandonado';

@Component({
  selector: 'app-mi-lista-component',
  imports: [RouterLink],
  templateUrl: './mi-lista-component.html',
  styleUrl: './mi-lista-component.css',
})
export class MiListaComponent {
  myListService = inject(MyListService);
  
  activeFilter = signal<FilterType>('Todos');

  filteredList = computed(() => {
    const filter = this.activeFilter();
    const allItems = this.myListService.myList();

    if (filter === 'Todos') return allItems;
    if (filter === 'Favoritos') return this.myListService.getFavorites();
    return this.myListService.getByStatus(filter as AnimeStatus);
  });

  stats = computed(() => {
    const list = this.myListService.myList();
    return {
      total: list.length,
      favoritos: this.myListService.getFavorites().length,
      pendiente: this.myListService.getByStatus('Pendiente').length,
      viendo: this.myListService.getByStatus('Viendo').length,
      completado: this.myListService.getByStatus('Completado').length,
      abandonado: this.myListService.getByStatus('Abandonado').length,
    };
  });

  setFilter(filter: FilterType): void {
    this.activeFilter.set(filter);
  }

  removeAnime(malId: number): void {
    if (confirm('¿Estás seguro de eliminar este anime de tu lista?')) {
      this.myListService.removeAnime(malId);
    }
  }

  toggleFavorite(malId: number): void {
    this.myListService.toggleFavorite(malId);
  }
}
