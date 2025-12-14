import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AnimeService } from '../services/anime.service';
import { MyListService } from '../services/my-list.service';
import { AnimeDetail, Episode, Review, AnimeStatus } from '../models/anime.model';

@Component({
  selector: 'app-detalle-anime',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './detalle-anime-component.html',
  styleUrl: './detalle-anime-component.css',
})
export class DetalleAnimeComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private animeService = inject(AnimeService);
  myListService = inject(MyListService);

  anime = signal<AnimeDetail | null>(null);
  episodes = signal<Episode[]>([]);
  reviews = signal<Review[]>([]);
  loading = signal(true);
  error = signal('');
  
  loadingEpisodes = signal(false);
  loadingReviews = signal(false);
  
  selectedStatus = signal<AnimeStatus>('Pendiente');

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      if (id) {
        this.loadAnimeDetails(id);
        this.loadEpisodes(id);
        this.loadReviews(id);
      }
    });
  }

  private loadAnimeDetails(id: number): void {
    this.loading.set(true);
    this.error.set('');

    this.animeService.getAnimeById(id).subscribe({
      next: (response) => {
        this.anime.set(response.data);
        this.loading.set(false);
        
        const inList = this.myListService.getAnimeFromList(id);
        if (inList) {
          this.selectedStatus.set(inList.status);
        }
      },
      error: (err) => {
        console.error('Error al cargar anime:', err);
        this.error.set('Error al cargar el anime. Intenta nuevamente.');
        this.loading.set(false);
      }
    });
  }

  private loadEpisodes(id: number): void {
    this.loadingEpisodes.set(true);
    
    this.animeService.getAnimeEpisodes(id).subscribe({
      next: (response) => {
        this.episodes.set(response.data);
        this.loadingEpisodes.set(false);
      },
      error: (err) => {
        console.error('Error al cargar episodios:', err);
        this.loadingEpisodes.set(false);
      }
    });
  }

  private loadReviews(id: number): void {
    this.loadingReviews.set(true);
    
    this.animeService.getAnimeReviews(id).subscribe({
      next: (response) => {
        this.reviews.set(response.data);
        this.loadingReviews.set(false);
      },
      error: (err) => {
        console.error('Error al cargar reseñas:', err);
        this.loadingReviews.set(false);
      }
    });
  }

  isInList(): boolean {
    const anime = this.anime();
    return anime ? this.myListService.isInList(anime.mal_id) : false;
  }

  isFavorite(): boolean {
    const anime = this.anime();
    if (!anime) return false;
    const item = this.myListService.getAnimeFromList(anime.mal_id);
    return item?.isFavorite || false;
  }

  addToList(): void {
    const anime = this.anime();
    if (anime) {
      this.myListService.addAnime(anime, this.selectedStatus());
    }
  }

  updateStatus(): void {
    const anime = this.anime();
    if (anime) {
      this.myListService.updateStatus(anime.mal_id, this.selectedStatus());
    }
  }

  toggleFavorite(): void {
    const anime = this.anime();
    if (anime) {
      this.myListService.toggleFavorite(anime.mal_id);
    }
  }

  removeFromList(): void {
    const anime = this.anime();
    if (anime && confirm('¿Estás seguro de eliminar este anime de tu lista?')) {
      this.myListService.removeAnime(anime.mal_id);
    }
  }

  onStatusChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.selectedStatus.set(select.value as AnimeStatus);
    if (this.isInList()) {
      this.updateStatus();
    }
  }

  truncateText(text: string, maxLength: number): string {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  }
}
