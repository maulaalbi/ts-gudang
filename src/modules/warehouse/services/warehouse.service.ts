import { inject, injectable } from 'inversify';
import { TYPES } from '../../../common/types';
import { Warehouse} from '@prisma/client';
import logger from '../../../common/logger';
import { ZodError } from 'zod';
import { ValidationError } from '../../../common/error-handler/validation-error';
import { IWarehouseService } from '../interfaces/warehouse.service.interface';
import { IWarehouseRepository } from '../interfaces/warehouse.repository.interface';
import { convertErrorValidationToList } from '../../../helper/converter/convertErrorValidationToList';

@injectable()
export class WarehouseService implements IWarehouseService {
  constructor(
    @inject(TYPES.WarehouseRepository) private WarehouseRepossitory: IWarehouseRepository,
  ) {}

  async createWarehouse(WarehouseDto: any): Promise<any> {
    try {
  
      // hit db
      const newWarehouse = await this.WarehouseRepossitory.createWarehouse(WarehouseDto as Warehouse);
      logger.info(
        `[Service - create Warehouse] Success create Warehouse with this data ${JSON.stringify(newWarehouse)}`,
      );

      return newWarehouse;
    } catch (error: any) {
      if (error instanceof ZodError) {
        const validationError = convertErrorValidationToList(error);
        logger.error(
          `[Service - register] Validation Error : ${JSON.stringify(validationError)}`,
        );
        throw new ValidationError('Data is invalid', validationError);
      }

      throw error;
    }
  }

  async getWarehouse(): Promise<any> {
    try {
      // hit db
      const getWarehouse = await this.WarehouseRepossitory.getWarehouse();
      logger.info(
        `[Service - create Warehouse] Success create Warehouse with this data ${JSON.stringify(getWarehouse)}`,
      );

      return getWarehouse;
    } catch (error: any) {
      if (error instanceof ZodError) {
        const validationError = convertErrorValidationToList(error);
        logger.error(
          `[Service - register] Validation Error : ${JSON.stringify(validationError)}`,
        );
        throw new ValidationError('Data is invalid', validationError);
      }

      throw error;
    }
  }

  async getWarehouseById(public_id : any): Promise<any> {
    try {
      // hit db
      const getWarehouse = await this.WarehouseRepossitory.getWarehouseById(public_id);
      logger.info(
        `[Service - get Warehouse By Id] Success create Warehouse with this data ${JSON.stringify(getWarehouse)}`,
      );

      return getWarehouse;
    } catch (error: any) {
      if (error instanceof ZodError) {
        const validationError = convertErrorValidationToList(error);
        logger.error(
          `[Service - get Warehouse By Id] Validation Error : ${JSON.stringify(validationError)}`,
        );
        throw new ValidationError('Data is invalid', validationError);
      }

      throw error;
    }
  }

}
