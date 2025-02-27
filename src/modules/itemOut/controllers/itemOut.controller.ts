import { inject, injectable } from 'inversify';
import { TYPES } from '../../../common/types';
import { NextFunction, Request, Response } from 'express';
import { createSuccessResponse } from '../../../common/response-handler/success-response';
import { ItemOut } from '@prisma/client';
import { AppError } from '../../../common/error-handler/app-error';
import {  IItemOutService } from '../interfaces/itemOut.service.interface';

@injectable()
export class ItemOutController {
  constructor(@inject(TYPES.ItemOutService) private ItemOutService: IItemOutService) {}

  async register(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const ItemOutRegisterDto: ItemOut = req.body;
    const userData = res.locals.userData;
    try {
      const itemOut = await this.ItemOutService.createItemOut(ItemOutRegisterDto,userData);
      const successData = createSuccessResponse<ItemOut>(itemOut, 'Register Item out success');
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

  async getAllItemOut(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const itemOut = await this.ItemOutService.getItemOut();
      const successData = createSuccessResponse<ItemOut>(itemOut, 'get ItemIn success');
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

  async getItemOutById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const itemOut = await this.ItemOutService.getItemOutById(req.params.public_id);
      const successData = createSuccessResponse<ItemOut>(itemOut, 'get Item Out success');
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
