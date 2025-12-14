import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AnimeService } from '../services/anime.service';
import { Anime } from '../models/anime.model';

@Component({
  selector: 'app-buscador-component',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './buscador-component.html',
  styleUrl: './buscador-component.css',
})
export class BuscadorComponent {
  private fb = inject(FormBuilder);
  private animeService = inject(AnimeService);

  animes = signal<Anime[]>([]);
  loading = signal(false);
  error = signal('');
  searched = signal(false);

  profileForm = this.fb.nonNullable.group({
    username: [''],
    opcionesTipo: ['1'],
    opcionesEstado: ['1'],
    opcionesClasificacion: ['1'],
    fechaInicio: [''],
    fechaFin: [''],
    opcionesOrdenar: ['1'],
    opcionesDireccion: ['1'],
  });

  onSubmit(): void {
    this.loading.set(true);
    this.error.set('');
    this.searched.set(true);
    this.animes.set([]);

    const filters = this.profileForm.getRawValue();

    this.animeService.searchAnimesAdvanced(filters).subscribe({
      next: (response) => {
        this.animes.set(response.data);
        this.loading.set(false);
        if (response.data.length === 0) {
          this.error.set('No se encontraron resultados con estos filtros');
        }
      },
      error: (err) => {
        console.error('Error al buscar animes:', err);
        this.error.set('Error al buscar animes. Intenta nuevamente.');
        this.loading.set(false);
      }
    });
  }

  onReset(): void {
    this.profileForm.reset({
      username: '',
      opcionesTipo: '1',
      opcionesEstado: '1',
      opcionesClasificacion: '1',
      fechaInicio: '',
      fechaFin: '',
      opcionesOrdenar: '1',
      opcionesDireccion: '1',
    });
    this.animes.set([]);
    this.error.set('');
    this.searched.set(false);
  }
}
