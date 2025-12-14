import { Routes } from '@angular/router';
import { Inicio } from './inicio/inicio';
import { MiLista } from './mi-lista/mi-lista';
import { Buscador } from './buscador/buscador';
import { DetalleAnime } from './detalle-anime/detalle-anime';

export const routes: Routes = [
    { path: '', component: Inicio },
    { path: 'Inicio', redirectTo: '', pathMatch: 'full' },
    { path: 'anime/:id', component: DetalleAnime },
    { path: 'mi-lista', component: MiLista },
    { path: 'MiLista', redirectTo: 'mi-lista', pathMatch: 'full' },
    { path: 'Buscador', component: Buscador },
];
