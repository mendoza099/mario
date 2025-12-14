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

export interface AnimeDetail extends Anime {
  duration: string;
  studios: Studio[];
  producers: Producer[];
}

export interface Studio {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

export interface Producer {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

export interface Episode {
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

export interface Review {
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

export interface JikanResponse<T> {
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

export type AnimeStatus = 'Pendiente' | 'Viendo' | 'Completado' | 'Abandonado';

export interface MyAnimeListItem {
  anime: Anime;
  status: AnimeStatus;
  isFavorite: boolean;
  personalScore?: number;
  addedDate: string;
}
