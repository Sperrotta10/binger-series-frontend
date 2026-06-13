import { z } from 'zod';

export const triggerIngestionSchema = z.object({
  external_source: z.string(),
  external_id: z.number(),
  series_title: z.string(),
});
