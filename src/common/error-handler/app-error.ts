import logger from '../logger';

// errors/AppError.ts
export class AppError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public details?: any,
  ) {
    super(message);
    this.name = this.constructor.name;
  }
}
