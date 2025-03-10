import { z } from 'zod';

export const registerValidation = z.object({
  name: z.string({ required_error: 'Name is required' }),
  location: z.optional(z.string({ required_error: 'location is required' })),
  adminGudangId: z.string({ required_error: 'admin is required' }),

});

export const loginValidation = z.object({
  email: z.string({ required_error: 'email is required' }),
  password: z.string({ required_error: 'password is required' }),
});
