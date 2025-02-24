import { SuccessResponse } from './base-response';

export const createSuccessResponse = <T>(
  data: T,
  message: string = 'Request was successful',
): SuccessResponse<T> => {
  return new SuccessResponse(data, message);
};
