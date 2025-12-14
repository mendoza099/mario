import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, delay } from 'rxjs';
import { Anime, AnimeDetail, Episode, Review, JikanResponse } from '../models/anime.model';

@Injectable({
  providedIn: 'root'
})
export class AnimeService {
  private http = inject(HttpClient);
  private apiUrl = 'https://api.jikan.moe/v4';

  searchAnimes(query: string): Observable<JikanResponse<Anime[]>> {
    const params = new HttpParams().set('q', query).set('sfw', 'true');
    return this.http.get<JikanResponse<Anime[]>>(`${this.apiUrl}/anime`, { params }).pipe(
      delay(500)
    );
  }

  searchAnimesAdvanced(filters: any): Observable<JikanResponse<Anime[]>> {
    let params = new HttpParams().set('sfw', 'true');

    if (filters.username) {
      params = params.set('q', filters.username);
    }
    if (filters.opcionesTipo && filters.opcionesTipo !== '1') {
      const tipos: { [key: string]: string } = {
        '2': 'tv',
        '3': 'movie',
        '4': 'ova',
        '5': 'special'
      };
      params = params.set('type', tipos[filters.opcionesTipo]);
    }
    if (filters.opcionesEstado && filters.opcionesEstado !== '1') {
      const estados: { [key: string]: string } = {
        '2': 'airing',
        '3': 'complete',
        '4': 'upcoming'
      };
      params = params.set('status', estados[filters.opcionesEstado]);
    }
    if (filters.opcionesClasificacion && filters.opcionesClasificacion !== '1') {
      const ratings: { [key: string]: string } = {
        '2': 'g',
        '3': 'pg',
        '4': 'pg13',
        '5': 'r17',
        '6': 'r',
        '7': 'rx'
      };
      params = params.set('rating', ratings[filters.opcionesClasificacion]);
    }
    if (filters.opcionesOrdenar && filters.opcionesOrdenar !== '1') {
      const ordenar: { [key: string]: string } = {
        '2': 'score',
        '3': 'popularity',
        '4': 'rank',
        '5': 'title',
        '6': 'start_date'
      };
      params = params.set('order_by', ordenar[filters.opcionesOrdenar]);
    }
    if (filters.opcionesDireccion && filters.opcionesDireccion !== '1') {
      const direccion: { [key: string]: string } = {
        '2': 'asc',
        '3': 'desc'
      };
      params = params.set('sort', direccion[filters.opcionesDireccion]);
    }

    return this.http.get<JikanResponse<Anime[]>>(`${this.apiUrl}/anime`, { params }).pipe(
      delay(500)
    );
  }

  getAnimeById(id: number): Observable<JikanResponse<AnimeDetail>> {
    return this.http.get<JikanResponse<AnimeDetail>>(`${this.apiUrl}/anime/${id}`).pipe(
      delay(500)
    );
  }

  getAnimeEpisodes(id: number, page: number = 1): Observable<JikanResponse<Episode[]>> {
    const params = new HttpParams().set('page', page.toString());
    return this.http.get<JikanResponse<Episode[]>>(`${this.apiUrl}/anime/${id}/episodes`, { params }).pipe(
      delay(500)
    );
  }

  getAnimeReviews(id: number, page: number = 1): Observable<JikanResponse<Review[]>> {
    const params = new HttpParams().set('page', page.toString());
    return this.http.get<JikanResponse<Review[]>>(`${this.apiUrl}/anime/${id}/reviews`, { params }).pipe(
      delay(500)
    );
  }

  getRandomAnime(): Observable<JikanResponse<Anime>> {
    return this.http.get<JikanResponse<Anime>>(`${this.apiUrl}/random/anime`).pipe(
      delay(500)
    );
  }
}
