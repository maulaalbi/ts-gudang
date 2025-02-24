import { ErrorResponse } from './base-response';

export const createErrorResponse = ({
  message,
  errorCode = 400,
  error,
  details,
}: {
  message: string;
  errorCode?: number;
  error?: string;
  details?: any;
}): ErrorResponse => {
  return new ErrorResponse(message, errorCode, error, details);
};
