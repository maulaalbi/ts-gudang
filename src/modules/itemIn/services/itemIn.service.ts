import { inject, injectable } from 'inversify';
import { TYPES } from '../../../common/types';
import { ItemIn} from '@prisma/client';
import logger from '../../../common/logger';
import { ZodError } from 'zod';
import { ValidationError } from '../../../common/error-handler/validation-error';
import { IItemInService } from '../interfaces/itemIn.service.interface';
import { IItemInRepository } from '../interfaces/itemIn.repository.interface';
import { convertErrorValidationToList } from '../../../helper/converter/convertErrorValidationToList';

@injectable()
export class ItemInService implements IItemInService {
  constructor(
    @inject(TYPES.ItemInRepository) private ItemInRepossitory: IItemInRepository,
  ) {}

  async createItemIn(ItemInDto: ItemIn): Promise<ItemIn> {
    try {
      // const warehouse = await prisma.warehouse.findUnique({
      //   where: { public_warehouse_id : ItemInDto.warehouseId },
      // });
  
      // if (!warehouse) {
      //   logger.error(
      //     `[Service - warehouse] Error : warehouse not found => ${JSON.stringify(warehouse)}`,
      //   );
      //   throw new ConflictError('warehouse not found');
      // }
      if (!ItemInDto.adminGudangId) {
        throw new Error('adminGudangId is required');
    }
      // hit db
      const newItemIn = await this.ItemInRepossitory.createItemIn(ItemInDto as ItemIn);
      logger.info(
        `[Service - create Item] Success create Item with this data ${JSON.stringify(newItemIn)}`,
      );

      return newItemIn;
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

  async getItemIn(): Promise<any> {
    try {
      // hit db
      const getItemIn = await this.ItemInRepossitory.getItemIn();
      logger.info(
        `[Service - create ItemIn] Success create ItemIn with this data ${JSON.stringify(getItemIn)}`,
      );

      return getItemIn;
    } catch (error: any) {
      if (error instanceof ZodError) {
        const validationError = convertErrorValidationToList(error);
        logger.error(
          `[Service - itemIn] Validation Error : ${JSON.stringify(validationError)}`,
        );
        throw new ValidationError('Data is invalid', validationError);
      }

      throw error;
    }
  }

  async getItemInById(public_id : any): Promise<any> {
    try {
      // hit db
      const getItemIn = await this.ItemInRepossitory.getItemInById(public_id);
      logger.info(
        `[Service - get itemIn By Id] Success create ItemIn with this data ${JSON.stringify(getItemIn)}`,
      );

      return getItemIn;
    } catch (error: any) {
      if (error instanceof ZodError) {
        const validationError = convertErrorValidationToList(error);
        logger.error(
          `[Service - get itemIn By Id] Validation Error : ${JSON.stringify(validationError)}`,
        );
        throw new ValidationError('Data is invalid', validationError);
      }

      throw error;
    }
  }

}
