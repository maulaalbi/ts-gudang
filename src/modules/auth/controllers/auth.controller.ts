import { inject, injectable } from 'inversify';
import { TYPES } from '../../../common/types';
import { IAuthService } from '../interfaces/auth.service.interface';
import { NextFunction, Request, Response } from 'express';
import { createSuccessResponse } from '../../../common/response-handler/success-response';
import { User } from '@prisma/client';
import { AppError } from '../../../common/error-handler/app-error';

@injectable()
export class AuthController {
  constructor(@inject(TYPES.AuthService) private authService: IAuthService) {}

  async register(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const userRegisterDto: any = req.body;
    try {
      const user = await this.authService.register(userRegisterDto);
      const successData = createSuccessResponse<User>(user, 'Register success');
      res.status(201).json(successData);
    } catch (err: any) {
      if (err instanceof AppError) {
        res.status(err.statusCode).json({
          status: 'error',
          statusCode: err?.statusCode,
          message: err.message,
          details: err.details || [],
        });
      }

      next(err);
    }
  }

  async login(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const request = req.body;
    try {
      const user = await this.authService.login(request);
      const successData = createSuccessResponse<any>(user, 'login success');
      res.status(201).json(successData);
    } catch (err: any) {
      if (err instanceof AppError) {
        res.status(500).json({
          status: 'error',
          message: err.message,
        });
      }

      next(err);
    }
  }

  async getUserLogin(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const userData = res.locals.userData;
    if (!userData) {
      throw new Error('Invalid user data');
    }
    try {
      const user = await this.authService.getUserLogin(userData.id);
      const successData = createSuccessResponse<any>(user, 'get success');
      res.status(201).json(successData);
    } catch (err: any) {
      if (err instanceof AppError) {
        res.status(500).json({
          status: 'error',
          message: err.message,
        });
      }

      next(err);
    }
  }

  async getAllUser(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const user = await this.authService.getAllUsers();
      const successData = createSuccessResponse<any>(user, 'get success');
      res.status(201).json(successData);
    } catch (err: any) {
      if (err instanceof AppError) {
        res.status(500).json({
          status: 'error',
          message: err.message,
        });
      }

      next(err);
    }
  }
}
