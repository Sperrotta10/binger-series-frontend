import { z } from 'zod';
import { apiClient } from '../client';
import { toggleFollowSchema } from '../schemas/social.schema';
import {
  ToggleFollowResponse,
  ToggleLikeResponse,
  SocialFeedResponse,
} from '../types/social.types';

export const SocialService = {
  toggleFollow: async (payload: z.infer<typeof toggleFollowSchema>): Promise<ToggleFollowResponse> => {
    const { data } = await apiClient.post<ToggleFollowResponse>('/api/v1/social/follow/toggle', payload);
    return data;
  },

  toggleLikeReview: async (reviewId: string): Promise<ToggleLikeResponse> => {
    const { data } = await apiClient.post<ToggleLikeResponse>(`/api/v1/social/reviews/${reviewId}/like/toggle`);
    return data;
  },

  getFeed: async (page: number = 1, limit: number = 20): Promise<SocialFeedResponse> => {
    const { data } = await apiClient.get<SocialFeedResponse>('/api/v1/social/feed', {
      params: { page, limit },
    });
    return data;
  },
};
