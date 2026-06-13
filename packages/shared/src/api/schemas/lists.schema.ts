import { z } from 'zod';

export const createListSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  is_private: z.boolean().default(false),
});

export const updateListSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().optional(),
  is_private: z.boolean().optional(),
});

export const updateListItemsSchema = z.object({
  items: z.array(
    z.object({
      series_id: z.string().uuid(),
      position: z.number().int().min(1),
    })
  ),
});
