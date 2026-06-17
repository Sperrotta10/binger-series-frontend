export interface List {
  id: string;
  name: string;
  description?: string;
  is_private: boolean;
  items_count: number;
  created_at?: string;
  updated_at?: string;
}

export interface ListItem {
  series_id: string;
  position: number;
  added_at: string;
  series: {
    id: string;
    title: string;
    poster_url: string;
  };
}

export interface CreateListResponse {
  status: string;
  data: {
    list_id: string;
    name: string;
    is_private: boolean;
    items_count: number;
  };
}

export interface MyListsResponse {
  status: string;
  pagination: {
    current_page: number;
    has_next_page: boolean;
  };
  data: List[];
}

export interface ListDetailResponse {
  status: string;
  data: {
    id: string;
    user_id: string;
    name: string;
    description?: string;
    is_private: boolean;
    created_at: string;
    updated_at: string;
    items: ListItem[];
  };
}

