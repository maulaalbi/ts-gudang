import { z } from 'zod';

export const registerValidation = z.object({
  itemId: z.string({ required_error: 'item Id is required' }),
  quantity: z.number(z.string({ required_error: 'quantity is required' })),  
});


