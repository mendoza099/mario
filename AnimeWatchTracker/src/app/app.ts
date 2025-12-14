import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Cabecera } from './cabecera-component/cabecera-component';

@Component({
  selector: 'app-root',
  imports: [Cabecera, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class Aplicacion {
  protected readonly titulo = signal('AnimeWatchTracker');
}
