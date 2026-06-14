export interface UserProfile {
  username: string;
  bio: string;
  avatarUrl: string;
  followersCount: number;
  followingCount: number;
}

export interface FavoriteShow {
  id: string;
  title: string;
  imageUrl: string;
}

export interface ActivityEntry {
  id: string;
  title: string;
  rating: number;
  date: string;
  comment?: string;
}

/** One bar in the rating histogram: score = "0.5", "1.0" ... "5.0" */
export interface RatingBar {
  score: string;
  count: number;
}

export interface UserList {
  id: string;
  title: string;
  description: string;
  itemCount: number;
  /** First 3 poster URLs shown stacked in the preview */
  previewPosters: string[];
}

export interface LikedShow {
  id: string;
  title: string;
  imageUrl: string;
  rating: number;
  hasReview: boolean;
}

export interface LikedReview {
  id: string;
  showTitle: string;
  imageUrl: string;
  rating: number;
  date: string;
  content: string;
  scopeLabel: string;
  creator: {
    username: string;
    avatarUrl: string;
  };
}

export interface LikedList {
  id: string;
  title: string;
  itemCount: number;
  previewPosters: string[];
  creator: {
    username: string;
    avatarUrl: string;
  };
}

export type LikeCategory = 'all' | 'shows' | 'reviews' | 'lists';

export type WatchlistStatus = 'plan-to-watch' | 'on-hold' | 'dropped';

export interface WatchlistItem {
  id: string;
  title: string;
  imageUrl: string;
  genre: string;
  status: WatchlistStatus;
}

export type ReviewScope = 'show' | 'season' | 'episode';

export interface ReviewEntry {
  id: string;
  scope: ReviewScope;
  scopeLabel: string; // e.g., "SHOW", "SEASON 3", "S01E10"
  showTitle: string;
  imageUrl: string;
  rating: number;
  date: string;
  content: string;
}
