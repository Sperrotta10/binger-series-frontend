import { z } from 'zod';

export const watchEpisodeSchema = z.object({
  episode_id: z.string().uuid(),
  watched_at: z.string().datetime().optional(),
});

export const updateWatchLogSchema = z.object({
  watched_at: z.string().datetime().optional(),
  is_rewatch: z.boolean().optional(),
});

export const seriesReviewSchema = z.object({
  series_id: z.string().uuid(),
  rating: z.number().min(0.5).max(5.0).multipleOf(0.5),
  content: z.string(),
  contains_spoilers: z.boolean().default(false),
});

export const seasonReviewSchema = z.object({
  series_id: z.string().uuid(),
  season_id: z.string().uuid(),
  rating: z.number().min(0.5).max(5.0).multipleOf(0.5),
  content: z.string(),
  contains_spoilers: z.boolean().default(false),
});

export const episodeReviewSchema = z.object({
  series_id: z.string().uuid(),
  season_id: z.string().uuid(),
  episode_id: z.string().uuid(),
  rating: z.number().min(0.5).max(5.0).multipleOf(0.5),
  content: z.string(),
  contains_spoilers: z.boolean().default(false),
});

export const updateReviewSchema = z.object({
  rating: z.number().min(0.5).max(5.0).multipleOf(0.5).optional(),
  content: z.string().optional(),
  contains_spoilers: z.boolean().optional(),
});

export const watchlistToggleSchema = z.object({
  series_id: z.string().uuid(),
});
