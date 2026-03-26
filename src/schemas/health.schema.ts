import { z } from 'zod';

export const healthQuerySchema = z.object({
  format: z.enum(['json', 'text']).optional(),
});

export type HealthQuery = z.infer<typeof healthQuerySchema>;
