import { z } from 'zod';
import { apiClient } from '../client';
import {
  watchEpisodeSchema,
  updateWatchLogSchema,
  seriesReviewSchema,
  seasonReviewSchema,
  episodeReviewSchema,
  updateReviewSchema,
  watchlistToggleSchema,
} from '../schemas/activity.schema';
import {
  WatchResponse,
  StatsResponse,
  ReviewResponse,
  WatchlistToggleResponse,
  GenericActionResponse,
} from '../types/activity.types';

export const ActivityService = {
  watchEpisode: async (payload: z.infer<typeof watchEpisodeSchema>): Promise<WatchResponse> => {
    const { data } = await apiClient.post<WatchResponse>('/api/v1/activity/watch', payload);
    return data;
  },

  updateWatchLog: async (logId: string, payload: z.infer<typeof updateWatchLogSchema>): Promise<WatchResponse> => {
    const { data } = await apiClient.put<WatchResponse>(`/api/v1/activity/watch/${logId}`, payload);
    return data;
  },

  deleteWatchLog: async (logId: string): Promise<GenericActionResponse> => {
    const { data } = await apiClient.delete<GenericActionResponse>(`/api/v1/activity/watch/${logId}`);
    return data;
  },

  getStats: async (): Promise<StatsResponse> => {
    const { data } = await apiClient.get<StatsResponse>('/api/v1/activity/watch/stats');
    return data;
  },

  createSeriesReview: async (payload: z.infer<typeof seriesReviewSchema>): Promise<ReviewResponse> => {
    const { data } = await apiClient.post<ReviewResponse>('/api/v1/activity/reviews/series', payload);
    return data;
  },

  createSeasonReview: async (payload: z.infer<typeof seasonReviewSchema>): Promise<ReviewResponse> => {
    const { data } = await apiClient.post<ReviewResponse>('/api/v1/activity/reviews/seasons', payload);
    return data;
  },

  createEpisodeReview: async (payload: z.infer<typeof episodeReviewSchema>): Promise<ReviewResponse> => {
    const { data } = await apiClient.post<ReviewResponse>('/api/v1/activity/reviews/episodes', payload);
    return data;
  },

  updateReview: async (reviewId: string, payload: z.infer<typeof updateReviewSchema>): Promise<GenericActionResponse> => {
    const { data } = await apiClient.put<GenericActionResponse>(`/api/v1/activity/reviews/${reviewId}`, payload);
    return data;
  },

  deleteReview: async (reviewId: string): Promise<GenericActionResponse> => {
    const { data } = await apiClient.delete<GenericActionResponse>(`/api/v1/activity/reviews/${reviewId}`);
    return data;
  },

  toggleWatchlist: async (payload: z.infer<typeof watchlistToggleSchema>): Promise<WatchlistToggleResponse> => {
    const { data } = await apiClient.post<WatchlistToggleResponse>('/api/v1/activity/watch/watchlist', payload);
    return data;
  },

  getWatchLog: async (): Promise<any> => {
    const { data } = await apiClient.get<any>('/api/v1/activity/watch/log');
    return data;
  },

  getWatchlist: async (): Promise<any> => {
    const { data } = await apiClient.get<any>('/api/v1/activity/watch/watchlist');
    return data;
  },

  getSeriesReviews: async (seriesId: string): Promise<any> => {
    const { data } = await apiClient.get<any>(`/api/v1/activity/reviews/series/${seriesId}`);
    return data;
  },
};
