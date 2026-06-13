import { z } from 'zod';
import { apiClient } from '../client';
import { catalogSearchQuerySchema } from '../schemas/catalog.schema';
import {
  SeriesDetailResponse,
  SeasonsListResponse,
  EpisodesListResponse,
  CatalogSearchResponse,
  TrendingCatalogResponse,
} from '../types/catalog.types';

export const CatalogService = {
  getSeriesDetail: async (id: string): Promise<SeriesDetailResponse> => {
    const { data } = await apiClient.get<SeriesDetailResponse>(`/api/v1/catalog/series/${id}`);
    return data;
  },

  getSeasons: async (id: string): Promise<SeasonsListResponse> => {
    const { data } = await apiClient.get<SeasonsListResponse>(`/api/v1/catalog/series/${id}/seasons`);
    return data;
  },

  getEpisodes: async (seasonId: string): Promise<EpisodesListResponse> => {
    const { data } = await apiClient.get<EpisodesListResponse>(`/api/v1/catalog/seasons/${seasonId}/episodes`);
    return data;
  },

  search: async (params: z.infer<typeof catalogSearchQuerySchema>): Promise<CatalogSearchResponse> => {
    const { data } = await apiClient.get<CatalogSearchResponse>('/api/v1/catalog/search', { params });
    return data;
  },

  getTrending: async (): Promise<TrendingCatalogResponse> => {
    const { data } = await apiClient.get<TrendingCatalogResponse>('/api/v1/catalog/trending');
    return data;
  },
};
