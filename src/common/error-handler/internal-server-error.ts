import { ErrorHandler } from './error-handler';

export class InternalServerErorr extends ErrorHandler {
  constructor() {
    super(500, 'Internal server error');
  }
}
