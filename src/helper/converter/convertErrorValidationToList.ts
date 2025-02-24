import { ZodError } from 'zod';

export const convertErrorValidationToList = (error: ZodError) => {
  return error.errors.map((err) => ({
    field: err.path.join('.'),
    message: err.message,
  }));
};
