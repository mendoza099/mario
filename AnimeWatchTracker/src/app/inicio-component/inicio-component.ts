import { Component, inject, signal, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AnimeService } from '../services/anime.service';
import { Anime } from '../models/anime.model';

@Component({
  selector: 'app-inicio-component',
  imports: [RouterLink, FormsModule],
  templateUrl: './inicio-component.html',
  styleUrl: './inicio-component.css',
})
export class InicioComponent implements OnInit {
  private animeService = inject(AnimeService);

  searchQuery = signal('');
  animes = signal<Anime[]>([]);
  loading = signal(true);
  error = signal('');
  searched = signal(false);

  ngOnInit(): void {
    this.loadCurrentAnimes();
  }

  loadCurrentAnimes(): void {
    this.loading.set(true);
    this.error.set('');
    this.searched.set(false);

    // Cargar animes que están actualmente en emisión (airing)
    this.animeService.searchAnimesAdvanced({ 
      username: '', 
      opcionesEstado: '2', // En emisión
      opcionesTipo: '1',
      opcionesClasificacion: '1',
      fechaInicio: '',
      fechaFin: '',
      opcionesOrdenar: '3', // Por popularidad
      opcionesDireccion: '3' // Descendente
    }).subscribe({
      next: (response) => {
        this.animes.set(response.data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error al cargar animes:', err);
        this.error.set('Error al cargar animes. Intenta recargar la página.');
        this.loading.set(false);
      }
    });
  }

  onSearch(): void {
    const query = this.searchQuery().trim();
    
    if (!query) {
      this.loadCurrentAnimes();
      return;
    }

    this.loading.set(true);
    this.error.set('');
    this.searched.set(true);
    this.animes.set([]);

    this.animeService.searchAnimes(query).subscribe({
      next: (response) => {
        this.animes.set(response.data);
        this.loading.set(false);
        if (response.data.length === 0) {
          this.error.set('No se encontraron resultados');
        }
      },
      error: (err) => {
        console.error('Error al buscar animes:', err);
        this.error.set('Error al buscar animes. Intenta nuevamente.');
        this.loading.set(false);
      }
    });
  }

  updateQuery(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchQuery.set(input.value);
  }

  clearSearch(): void {
    this.searchQuery.set('');
    this.loadCurrentAnimes();
  }
}
