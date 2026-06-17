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

/** Returned by GET /api/v1/catalog/hybrid-search */
export interface HybridSearchResult {
  /** Local UUID when isImported=true; TVmaze numeric ID (as string) when isImported=false */
  id: string;
  /** TVmaze numeric ID — null for legacy local records without an external source */
  api_id: string | null;
  title: string;
  premiered: string | null;
  genres: string[];
  poster_url: string | null;
  rating_average: number;
  /** true  → record lives in our local DB (use UUID for navigation)
   *  false → record only exists on TVmaze (JIT import needed on click) */
  isImported: boolean;
}

export interface HybridSearchResponse {
  status: string;
  results_count: number;
  data: HybridSearchResult[];
}


export interface TrendingSeries {
  id: string;
  external_id?: number;
  is_imported: boolean;
  title: string;
  poster_url: string | null;
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
