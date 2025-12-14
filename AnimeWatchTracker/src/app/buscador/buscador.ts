import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ServicioAnime } from '../services/servicio-anime';
import { Anime } from '../models/modelo-anime';

@Component({
  selector: 'app-buscador',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './buscador.html',
  styleUrl: './buscador.css',
})
export class Buscador {
  private fb = inject(FormBuilder);
  private servicioAnime = inject(ServicioAnime);

  animes = signal<Anime[]>([]);
  cargando = signal(false);
  error = signal('');
  buscado = signal(false);

  formulario = this.fb.nonNullable.group({
    nombre: [''],
    tipo: ['1'],
    estado: ['1'],
    clasificacion: ['1'],
    fechaInicio: [''],
    fechaFin: [''],
    ordenar: ['1'],
    direccion: ['1'],
  });

  alEnviar(): void {
    this.cargando.set(true);
    this.error.set('');
    this.buscado.set(true);
    this.animes.set([]);

    const filtros = this.formulario.getRawValue();

    this.servicioAnime.buscarAnimesAvanzado(filtros).subscribe({
      next: (respuesta) => {
        this.animes.set(respuesta.data);
        this.cargando.set(false);
        if (respuesta.data.length === 0) {
          this.error.set('No se encontraron resultados con estos filtros');
        }
      },
      error: (err) => {
        console.error('Error al buscar animes:', err);
        this.error.set('Error al buscar animes. Intenta nuevamente.');
        this.cargando.set(false);
      }
    });
  }

  alLimpiar(): void {
    this.formulario.reset({
      nombre: '',
      tipo: '1',
      estado: '1',
      clasificacion: '1',
      fechaInicio: '',
      fechaFin: '',
      ordenar: '1',
      direccion: '1',
    });
    this.animes.set([]);
    this.error.set('');
    this.buscado.set(false);
  }
}
