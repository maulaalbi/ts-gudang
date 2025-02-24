import { inject, injectable } from 'inversify';
import { TYPES } from '../../../common/types';
import { NextFunction, Request, Response } from 'express';
import { createSuccessResponse } from '../../../common/response-handler/success-response';
import { Item } from '@prisma/client';
import { AppError } from '../../../common/error-handler/app-error';
import { IItemService } from '../interfaces/item.service.interface';

@injectable()
export class ItemController {
  constructor(@inject(TYPES.ItemService) private ItemService: IItemService) {}

  async register(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const ItemRegisterDto: Item = req.body;
    try {
      const item = await this.ItemService.createItem(ItemRegisterDto);
      const successData = createSuccessResponse<Item>(item, 'Register Item success');
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

  async getAllItem(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const item = await this.ItemService.getItem();
      const successData = createSuccessResponse<Item>(item, 'get Item success');
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

  async getItemById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const item = await this.ItemService.getItemById(req.params.public_id);
      const successData = createSuccessResponse<Item>(item, 'get Item success');
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
