import { z } from 'zod';
import { apiClient } from '../client';
import { triggerIngestionSchema } from '../schemas/ingestion.schema';
import { IngestionTriggerResponse, IngestionSyncResponse } from '../types/ingestion.types';

export const IngestionService = {
  trigger: async (payload: z.infer<typeof triggerIngestionSchema>, secretToken: string): Promise<IngestionTriggerResponse> => {
    const { data } = await apiClient.post<IngestionTriggerResponse>('/api/v1/ingestion/trigger', payload, {
      headers: {
        'X-Internal-Secret': secretToken,
      },
    });
    return data;
  },

  dailySync: async (secretToken: string): Promise<IngestionSyncResponse> => {
    const { data } = await apiClient.post<IngestionSyncResponse>('/api/v1/ingestion/cron/daily-sync', {}, {
      headers: {
        'X-Internal-Secret': secretToken,
      },
    });
    return data;
  },
};
