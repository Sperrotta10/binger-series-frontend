export interface User {
  id: string;
  email: string;
  username: string;
  fullName: string | null;
  avatar_url: string | null;
  biography?: string;
  created_at?: string;
  followers_count?: number;
  following_count?: number;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthResponse {
  status: string;
  message?: string;
  data: {
    user: User;
    tokens: AuthTokens;
  };
}

export interface RefreshResponse {
  status: string;
  data: {
    tokens: AuthTokens;
  };
}

export interface GenericMessageResponse {
  status: string;
  message: string;
}

export interface ProfileResponse {
  status: string;
  message?: string;
  data: {
    user: User;
  };
}
