import { inject, injectable } from 'inversify';
import { TYPES } from '../../../common/types';
import { NextFunction, Request, Response } from 'express';
import { createSuccessResponse } from '../../../common/response-handler/success-response';
import { Warehouse } from '@prisma/client';
import { AppError } from '../../../common/error-handler/app-error';
import { IWarehouseService } from '../interfaces/warehouse.service.interface';

@injectable()
export class WarehouseController {
  constructor(@inject(TYPES.WarehouseService) private WarehouseService: IWarehouseService) {}

  async register(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const WarehouseRegisterDto: Warehouse = req.body;
    try {
      const warehouse = await this.WarehouseService.createWarehouse(WarehouseRegisterDto);
      const successData = createSuccessResponse<Warehouse>(warehouse, 'Register Warehouse success');
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

  async getAllWarehouse(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const Warehouse = await this.WarehouseService.getWarehouse();
      const successData = createSuccessResponse<Warehouse>(Warehouse, 'get Warehouse success');
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

  async getWarehouseById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const Warehouse = await this.WarehouseService.getWarehouseById(req.params.public_id);
      const successData = createSuccessResponse<Warehouse>(Warehouse, 'get Warehouse success');
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
