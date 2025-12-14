# AnimeWatch Tracker - Proyecto Completo

## Estado del Proyecto
✅ **COMPLETADO Y FUNCIONANDO**

## Descripción
Aplicación web para buscar, explorar y gestionar una lista personal de animes. Desarrollada con Angular 20 y TypeScript, consumiendo la API pública de Jikan (MyAnimeList).

## Tecnologías
- Angular 20.3.0 (Standalone Components)
- TypeScript 5.9.2
- RxJS para manejo de observables
- Signals para estado reactivo
- HttpClient con Fetch API
- Vite como bundler
- CSS con variables para temas

## Estructura del Proyecto

```
AnimeWatchTracker/
├── src/app/
│   ├── inicio/              # Página principal con animes en emisión
│   ├── mi-lista/            # Gestión de lista personal
│   ├── buscador/            # Búsqueda avanzada con filtros
│   ├── detalle-anime/       # Vista detallada de anime
│   ├── cabecera/            # Navegación y tema
│   ├── services/
│   │   ├── servicio-anime.ts
│   │   ├── servicio-mi-lista.ts
│   │   └── servicio-tema.ts
│   └── models/
│       └── modelo-anime.ts
```

## Funcionalidades Implementadas

### Obligatorias
- [x] Buscador de animes con resultados en grid
- [x] Detalle de anime con información completa
- [x] Listado de episodios con fechas
- [x] Reseñas de usuarios
- [x] Gestión de Mi Lista con localStorage
- [x] Estados: Pendiente, Viendo, Completado, Abandonado
- [x] Favoritos
- [x] Enrutamiento completo (/, /anime/:id, /mi-lista, /Buscador)
- [x] Buscador avanzado con 8 filtros
- [x] Personalización (logo, favicon)

### Opcionales
- [x] Modo oscuro persistente con toggle
- [x] Filtros en Mi Lista por estado
- [x] Diseño responsive
- [x] Transiciones suaves

## Rutas

- `/` - Inicio (animes en emisión ordenados por popularidad)
- `/anime/:id` - Detalle de anime
- `/mi-lista` - Lista personal del usuario
- `/Buscador` - Búsqueda avanzada con filtros

## Características Técnicas

### Nomenclatura
- Código 100% en español
- Nombres simples sin guiones
- Variables descriptivas: `busqueda`, `cargando`, `animes`
- Métodos claros: `buscarAnimes()`, `agregarALista()`
- Sin comentarios en el código

### Servicios

**ServicioAnime**
- Búsqueda simple y avanzada
- Obtención de detalles, episodios y reseñas
- Integración con Jikan API v4

**ServicioMiLista**
- CRUD completo de animes
- Persistencia en localStorage
- Gestión de estados y favoritos

**ServicioTema**
- Modo oscuro/claro
- Persistencia de preferencia
- Aplicación dinámica de estilos

### Modelos TypeScript
- Interfaces completas para API
- Tipos estrictos
- Modelos: Anime, DetalleAnime, Episodio, Resena, AnimeEnLista

## Instalación y Uso

```bash
cd AnimeWatchTracker
npm install
npm start
```

La aplicación estará disponible en `http://localhost:4200`

## Build de Producción

```bash
npm run build
```

Output en `dist/AnimeWatchTracker`

## Estadísticas

- **Componentes**: 5
- **Servicios**: 3
- **Rutas**: 4
- **Bundle size**: 366 KB (95 KB comprimido)
- **Líneas de código**: ~2,500

## Autor

Desarrollado por mendoza099

Co-authored-by: Ona <no-reply@ona.com>

## Licencia

Proyecto educativo - Angular 20
