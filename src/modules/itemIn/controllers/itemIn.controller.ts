import { inject, injectable } from 'inversify';
import { TYPES } from '../../../common/types';
import { NextFunction, Request, Response } from 'express';
import { createSuccessResponse } from '../../../common/response-handler/success-response';
import { ItemIn } from '@prisma/client';
import { AppError } from '../../../common/error-handler/app-error';
import { IItemInService } from '../interfaces/itemIn.service.interface';

@injectable()
export class ItemInController {
  constructor(@inject(TYPES.ItemInService) private ItemInService: IItemInService) {}

  async register(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const ItemInRegisterDto: ItemIn = req.body;
    const userData = res.locals.userData;
    try {
      const itemIn = await this.ItemInService.createItemIn(ItemInRegisterDto,userData);
      const successData = createSuccessResponse<ItemIn>(itemIn, 'Register Item success');
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

  async getAllItemIn(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const itemIn = await this.ItemInService.getItemIn();
      const successData = createSuccessResponse<ItemIn>(itemIn, 'get ItemIn success');
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

  async getItemInById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const itemIn = await this.ItemInService.getItemInById(req.params.public_id);
      const successData = createSuccessResponse<ItemIn>(itemIn, 'get ItemIn success');
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
