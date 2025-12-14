import { Routes } from '@angular/router';
import { InicioComponent } from './inicio-component/inicio-component';
import { MiListaComponent } from './mi-lista-component/mi-lista-component';
import { BuscadorComponent } from './buscador-component/buscador-component';
import { DetalleAnimeComponent } from './detalle-anime-component/detalle-anime-component';

export const routes: Routes = [
    { path: '', component: InicioComponent },
    { path: 'Inicio', redirectTo: '', pathMatch: 'full' },
    { path: 'anime/:id', component: DetalleAnimeComponent },
    { path: 'mi-lista', component: MiListaComponent },
    { path: 'MiLista', redirectTo: 'mi-lista', pathMatch: 'full' },
    { path: 'Buscador', component: BuscadorComponent },
];
