import { z } from 'zod';

export const catalogSearchQuerySchema = z.object({
  q: z.string().min(1),
  genre: z.string().optional(),
  year: z.coerce.number().int().optional(),
});
