export interface Series {
  id: string;
  title: string;
  summary: string;
  premiered: string;
  status: string;
  genres: string[];
  rating_average: number;
  poster_url: string;
  backdrop_url: string;
  total_seasons: number;
  in_watchlist: boolean;
}

export interface Season {
  id: string;
  number: number;
  episode_count: number;
  premiere_date: string;
}

export interface Episode {
  id: string;
  number: number;
  title: string;
  runtime: number;
  airdate: string;
  summary: string;
}

export interface SearchResult {
  id: string;
  title: string;
  premiered: string;
  poster_url: string;
  rating_average: number;
}

export interface TrendingSeries {
  id: string;
  title: string;
  poster_url: string;
  rating_average: number;
  weekly_views_count: number;
}

export interface SeriesDetailResponse {
  status: string;
  data: Series;
}

export interface SeasonsListResponse {
  status: string;
  data: Season[];
}

export interface EpisodesListResponse {
  status: string;
  data: Episode[];
}

export interface CatalogSearchResponse {
  status: string;
  results_count: number;
  data: SearchResult[];
}

export interface TrendingCatalogResponse {
  status: string;
  timeframe: string;
  data: TrendingSeries[];
}
