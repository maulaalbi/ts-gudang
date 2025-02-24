import { z } from 'zod';

export const registerValidation = z.object({
  name: z.string({ required_error: 'Name is required' }),
  description: z.optional(z.string({ required_error: 'descripton is required' })),
  warehouseId: z.string({ required_error: 'warehouseId is required' }),
  

});


