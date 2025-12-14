import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CabeceraComponent } from './cabecera-component/cabecera-component';

@Component({
  selector: 'app-root',
  imports: [CabeceraComponent, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('AnimeWatchTracker');
}
