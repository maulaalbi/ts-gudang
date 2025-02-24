import type{ NextFunction, Request, Response } from 'express';
import { NotFoundError } from '../common/error-handler/not-found-error';
import { InternalServerErorr } from '../common/error-handler/internal-server-error';
import logger from '../common/logger';

export const notFoundHandler = (req: Request, res: Response) => {
  const notFoundError = new NotFoundError();
  notFoundError.sendError(res);
};

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  logger.error(`Error occurred: ${err.message}`, { stack: err.stack });
  // handle specific errors here, or default to internal server error
  if (err instanceof InternalServerErorr) {
    err.sendError(res);
  } else {
    const internalError = new InternalServerErorr();
    internalError.sendError(res);
  }
};
