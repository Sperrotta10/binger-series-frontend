import { z } from 'zod';

export const toggleFollowSchema = z.object({
  target_user_id: z.string().uuid(),
});
