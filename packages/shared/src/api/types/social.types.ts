export interface ToggleFollowResponse {
  status: string;
  data: {
    action: 'followed' | 'unfollowed';
    target_user_id: string;
  };
}

export interface ToggleLikeResponse {
  status: string;
  data: {
    action: 'liked' | 'unliked';
    review_id: string;
  };
}

export interface FeedItem {
  activity_type: string;
  id: string;
  user: {
    id: string;
    username: string;
    avatar_url: string;
  };
  series?: {
    id: string;
    title: string;
  };
  rating?: number;
  content?: string;
  contains_spoilers?: boolean;
  likes_count?: number;
  created_at: string;
}

export interface SocialFeedResponse {
  status: string;
  pagination: {
    current_page: number;
    has_next_page: boolean;
  };
  data: FeedItem[];
}
