import { z } from 'zod';

export const createUserSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be at most 100 characters'),
  email: z.string().email('Invalid email format'),
  age: z
    .number()
    .int('Age must be an integer')
    .min(18, 'Age must be at least 18')
    .max(150, 'Age must be at most 150')
    .optional(),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
