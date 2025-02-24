import { z } from 'zod';

export const registerValidation = z.object({
  itemId: z.string({ required_error: 'item Id is required' }),
  adminGudangId: z.string(z.string({ required_error: 'admin gudang is required' })),
  quantity: z.number(z.string({ required_error: 'quantity is required' })),  
});


