import { z } from 'zod';
import { apiClient } from '../client';
import type {  catalogSearchQuerySchema  } from '../schemas/catalog.schema';
import type { 
  SeriesDetailResponse,
  SeasonsListResponse,
  EpisodesListResponse,
  CatalogSearchResponse,
  TrendingCatalogResponse,
  HybridSearchResponse,
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

  /** Multi-tier hybrid search: local DB + TVmaze live, merged & de-duplicated. */
  hybridSearch: async (params: z.infer<typeof catalogSearchQuerySchema>): Promise<HybridSearchResponse> => {
    const { data } = await apiClient.get<HybridSearchResponse>('/api/v1/catalog/hybrid-search', { params });
    return data;
  },

  /**
   * JIT import trigger — called when the user clicks a card with isImported=false.
   * Calls the public catalog/jit-import endpoint (no internal secret required).
   */
  triggerJitImport: async (tvmazeId: string, seriesTitle?: string): Promise<{ job_id: string | null }> => {
    const { data } = await apiClient.post<{ status: string; data: { job_id: string | null } }>(
      '/api/v1/catalog/jit-import',
      {
        tvmaze_id: parseInt(tvmazeId, 10),
        series_title: seriesTitle,
      },
    );
    return data.data;
  },

  /**
   * Bootstrap the dashboard when local trending is empty.
   * Fires-and-forgets — no need to await on the home page.
   */
  bootstrapDashboard: async (): Promise<void> => {
    await apiClient.post('/api/v1/catalog/bootstrap');
  },

  getTrending: async (): Promise<TrendingCatalogResponse> => {
    const { data } = await apiClient.get<TrendingCatalogResponse>('/api/v1/catalog/trending');
    return data;
  },
};

