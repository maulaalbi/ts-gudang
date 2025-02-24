import { Response } from 'express';

export class ErrorHandler {
  public statusCode: number;
  public message: string;

  constructor(statusCode: number, message: string) {
    this.statusCode = statusCode;
    this.message = message;
  }

  public sendError(res: Response) {
    res.status(this.statusCode).json({
      statusCode: this.statusCode,
      message: this.message,
    });
  }
}
