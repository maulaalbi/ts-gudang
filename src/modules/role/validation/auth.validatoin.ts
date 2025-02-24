import { z } from 'zod';

export const registerValidation = z.object({
  firstName: z.string({ required_error: 'Name is required' }),
  lastName: z.optional(z.string({ required_error: 'Name is required' })),
  email: z.string({ required_error: 'email is required' }),
  password: z.string({ required_error: 'password is required' }),
});

export const loginValidation = z.object({
  email: z.string({ required_error: 'email is required' }),
  password: z.string({ required_error: 'password is required' }),
});
