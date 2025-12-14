export interface Anime {
  mal_id: number;
  url: string;
  images: {
    jpg: {
      image_url: string;
      small_image_url: string;
      large_image_url: string;
    };
    webp: {
      image_url: string;
      small_image_url: string;
      large_image_url: string;
    };
  };
  title: string;
  title_english: string | null;
  title_japanese: string | null;
  type: string;
  episodes: number | null;
  status: string;
  airing: boolean;
  score: number | null;
  scored_by: number | null;
  rank: number | null;
  popularity: number;
  synopsis: string | null;
  background: string | null;
  season: string | null;
  year: number | null;
  genres: Genre[];
  rating: string | null;
}

export interface Genre {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

export interface DetalleAnime extends Anime {
  duration: string;
  studios: Estudio[];
  producers: Productor[];
}

export interface Estudio {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

export interface Productor {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

export interface Episodio {
  mal_id: number;
  url: string;
  title: string;
  title_japanese: string | null;
  title_romanji: string | null;
  aired: string | null;
  score: number | null;
  filler: boolean;
  recap: boolean;
  forum_url: string | null;
}

export interface Resena {
  mal_id: number;
  url: string;
  type: string;
  date: string;
  review: string;
  score: number;
  tags: string[];
  is_spoiler: boolean;
  is_preliminary: boolean;
  user: {
    url: string;
    username: string;
    images: {
      jpg: {
        image_url: string;
      };
      webp: {
        image_url: string;
      };
    };
  };
}

export interface RespuestaJikan<T> {
  data: T;
  pagination?: {
    last_visible_page: number;
    has_next_page: boolean;
    current_page: number;
    items: {
      count: number;
      total: number;
      per_page: number;
    };
  };
}

export type EstadoAnime = 'Pendiente' | 'Viendo' | 'Completado' | 'Abandonado';

export interface AnimeEnLista {
  anime: Anime;
  estado: EstadoAnime;
  esFavorito: boolean;
  fechaAgregado: string;
}
