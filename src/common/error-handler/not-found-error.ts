import { ErrorHandler } from './error-handler';

export class NotFoundError extends ErrorHandler {
  constructor() {
    super(404, 'Route not found');
  }
}
