import { Routes } from '@angular/router';
import { Inicio } from './inicio-component/inicio-component';
import { MiLista } from './mi-lista-component/mi-lista-component';
import { Buscador } from './buscador-component/buscador-component';
import { DetalleAnime } from './detalle-anime-component/detalle-anime-component';

export const routes: Routes = [
    { path: '', component: Inicio },
    { path: 'Inicio', redirectTo: '', pathMatch: 'full' },
    { path: 'anime/:id', component: DetalleAnime },
    { path: 'mi-lista', component: MiLista },
    { path: 'MiLista', redirectTo: 'mi-lista', pathMatch: 'full' },
    { path: 'Buscador', component: Buscador },
];
