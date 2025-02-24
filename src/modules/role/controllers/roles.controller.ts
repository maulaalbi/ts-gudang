import { inject, injectable } from 'inversify';
import { TYPES } from '../../../common/types';
import { NextFunction, Request, Response } from 'express';
import { createSuccessResponse } from '../../../common/response-handler/success-response';
import { Role } from '@prisma/client';
import { AppError } from '../../../common/error-handler/app-error';
import { IRoleService } from '../interfaces/roles.service.interface';

@injectable()
export class RoleController {
  constructor(@inject(TYPES.RoleService) private RoleService: IRoleService) {}

  async register(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const roleRegisterDto: Role = req.body;
    try {
      const role = await this.RoleService.createRole(roleRegisterDto);
      const successData = createSuccessResponse<Role>(role, 'Register role success');
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

  async getAllRole(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const role = await this.RoleService.getRole();
      const successData = createSuccessResponse<Role>(role, 'get role success');
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

 
}
