export interface WatchLogEntry {
  log_id: string;
  episode_id: string;
  is_rewatch: boolean;
  watched_at: string;
}

export interface WatchResponse {
  status: string;
  message: string;
  data: WatchLogEntry;
}

export interface UserStats {
  user_id: string;
  total_minutes_watched: number;
  total_episodes_count: number;
  current_streak_days: number;
  episodes_watched_today: number;
}

export interface StatsResponse {
  status: string;
  data: UserStats;
}

export interface ReviewEntry {
  review_id: string;
  user?: {
    id: string;
    username: string;
    profile_image: string | null;
  };
  rating: number;
  content: string | null;
  contains_spoilers: boolean;
  scope: 'SHOW' | 'SEASON' | 'EPISODE';
  season_number: number | null;
  episode_number: number | null;
  created_at: string;
  updated_at: string;
}

export interface ReviewResponse {
  status: string;
  message: string;
  data: ReviewEntry;
}

export interface WatchlistToggleResponse {
  status: string;
  data: {
    series_id: string;
    action: 'added' | 'removed';
  };
}

export interface GenericActionResponse {
  status: string;
  message: string;
}
