import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, delay } from 'rxjs';
import { Anime, DetalleAnime, Episodio, Resena, RespuestaJikan } from '../models/modelo-anime';

@Injectable({
  providedIn: 'root'
})
export class ServicioAnime {
  private http = inject(HttpClient);
  private urlApi = 'https://api.jikan.moe/v4';

  buscarAnimes(texto: string): Observable<RespuestaJikan<Anime[]>> {
    const parametros = new HttpParams().set('q', texto).set('sfw', 'true');
    return this.http.get<RespuestaJikan<Anime[]>>(`${this.urlApi}/anime`, { params: parametros }).pipe(
      delay(500)
    );
  }

  buscarAnimesAvanzado(filtros: any): Observable<RespuestaJikan<Anime[]>> {
    let parametros = new HttpParams().set('sfw', 'true');

    if (filtros.nombre) {
      parametros = parametros.set('q', filtros.nombre);
    }
    if (filtros.tipo && filtros.tipo !== '1') {
      const tipos: { [key: string]: string } = {
        '2': 'tv',
        '3': 'movie',
        '4': 'ova',
        '5': 'special'
      };
      parametros = parametros.set('type', tipos[filtros.tipo]);
    }
    if (filtros.estado && filtros.estado !== '1') {
      const estados: { [key: string]: string } = {
        '2': 'airing',
        '3': 'complete',
        '4': 'upcoming'
      };
      parametros = parametros.set('status', estados[filtros.estado]);
    }
    if (filtros.clasificacion && filtros.clasificacion !== '1') {
      const clasificaciones: { [key: string]: string } = {
        '2': 'g',
        '3': 'pg',
        '4': 'pg13',
        '5': 'r17',
        '6': 'r',
        '7': 'rx'
      };
      parametros = parametros.set('rating', clasificaciones[filtros.clasificacion]);
    }
    if (filtros.ordenar && filtros.ordenar !== '1') {
      const ordenar: { [key: string]: string } = {
        '2': 'score',
        '3': 'popularity',
        '4': 'rank',
        '5': 'title',
        '6': 'start_date'
      };
      parametros = parametros.set('order_by', ordenar[filtros.ordenar]);
    }
    if (filtros.direccion && filtros.direccion !== '1') {
      const direccion: { [key: string]: string } = {
        '2': 'asc',
        '3': 'desc'
      };
      parametros = parametros.set('sort', direccion[filtros.direccion]);
    }

    return this.http.get<RespuestaJikan<Anime[]>>(`${this.urlApi}/anime`, { params: parametros }).pipe(
      delay(500)
    );
  }

  obtenerAnimePorId(id: number): Observable<RespuestaJikan<DetalleAnime>> {
    return this.http.get<RespuestaJikan<DetalleAnime>>(`${this.urlApi}/anime/${id}`).pipe(
      delay(500)
    );
  }

  obtenerEpisodios(id: number, pagina: number = 1): Observable<RespuestaJikan<Episodio[]>> {
    const parametros = new HttpParams().set('page', pagina.toString());
    return this.http.get<RespuestaJikan<Episodio[]>>(`${this.urlApi}/anime/${id}/episodes`, { params: parametros }).pipe(
      delay(500)
    );
  }

  obtenerResenas(id: number, pagina: number = 1): Observable<RespuestaJikan<Resena[]>> {
    const parametros = new HttpParams().set('page', pagina.toString());
    return this.http.get<RespuestaJikan<Resena[]>>(`${this.urlApi}/anime/${id}/reviews`, { params: parametros }).pipe(
      delay(500)
    );
  }

  obtenerAnimeAleatorio(): Observable<RespuestaJikan<Anime>> {
    return this.http.get<RespuestaJikan<Anime>>(`${this.urlApi}/random/anime`).pipe(
      delay(500)
    );
  }
}
