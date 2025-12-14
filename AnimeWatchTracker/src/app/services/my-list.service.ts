import { Injectable, signal } from '@angular/core';
import { Anime, MyAnimeListItem, AnimeStatus } from '../models/anime.model';

@Injectable({
  providedIn: 'root'
})
export class MyListService {
  private readonly STORAGE_KEY = 'animeWatchTracker_myList';
  
  myList = signal<MyAnimeListItem[]>([]);

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage(): void {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      try {
        const list = JSON.parse(stored);
        this.myList.set(list);
      } catch (error) {
        console.error('Error loading from localStorage:', error);
        this.myList.set([]);
      }
    }
  }

  private saveToStorage(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.myList()));
  }

  addAnime(anime: Anime, status: AnimeStatus = 'Pendiente'): void {
    const currentList = this.myList();
    const exists = currentList.find(item => item.anime.mal_id === anime.mal_id);
    
    if (!exists) {
      const newItem: MyAnimeListItem = {
        anime,
        status,
        isFavorite: false,
        addedDate: new Date().toISOString()
      };
      this.myList.set([...currentList, newItem]);
      this.saveToStorage();
    }
  }

  removeAnime(malId: number): void {
    const currentList = this.myList();
    this.myList.set(currentList.filter(item => item.anime.mal_id !== malId));
    this.saveToStorage();
  }

  updateStatus(malId: number, status: AnimeStatus): void {
    const currentList = this.myList();
    const updated = currentList.map(item => 
      item.anime.mal_id === malId ? { ...item, status } : item
    );
    this.myList.set(updated);
    this.saveToStorage();
  }

  toggleFavorite(malId: number): void {
    const currentList = this.myList();
    const updated = currentList.map(item => 
      item.anime.mal_id === malId ? { ...item, isFavorite: !item.isFavorite } : item
    );
    this.myList.set(updated);
    this.saveToStorage();
  }

  updatePersonalScore(malId: number, score: number): void {
    const currentList = this.myList();
    const updated = currentList.map(item => 
      item.anime.mal_id === malId ? { ...item, personalScore: score } : item
    );
    this.myList.set(updated);
    this.saveToStorage();
  }

  isInList(malId: number): boolean {
    return this.myList().some(item => item.anime.mal_id === malId);
  }

  getAnimeFromList(malId: number): MyAnimeListItem | undefined {
    return this.myList().find(item => item.anime.mal_id === malId);
  }

  getByStatus(status: AnimeStatus): MyAnimeListItem[] {
    return this.myList().filter(item => item.status === status);
  }

  getFavorites(): MyAnimeListItem[] {
    return this.myList().filter(item => item.isFavorite);
  }

  getAll(): MyAnimeListItem[] {
    return this.myList();
  }
}
