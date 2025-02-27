import { inject, injectable } from 'inversify';
import { TYPES } from '../../../common/types';
import { Item} from '@prisma/client';
import logger from '../../../common/logger';
import { ZodError } from 'zod';
import { ValidationError } from '../../../common/error-handler/validation-error';
import { IItemService } from '../interfaces/item.service.interface';
import { IItemRepository } from '../interfaces/item.repository.interface';
import { convertErrorValidationToList } from '../../../helper/converter/convertErrorValidationToList';
import { prisma } from '../../../config/prisma';
import { ConflictError } from '../../../common/error-handler/conflict-error';

@injectable()
export class ItemService implements IItemService {
  constructor(
    @inject(TYPES.ItemRepository) private ItemRepossitory: IItemRepository,
  ) {}

  async createItem(ItemDto: Item,userData :any): Promise<Item> {
    try {
      const warehouse = await prisma.warehouse.findUnique({
        where: { 
          public_warehouse_id : ItemDto.warehouseId
         },select : {
          adminGudangId : true,
          name : true
         }
      });
  
      if (!warehouse) {
        logger.error(
          `[Service - warehouse] Error : warehouse not found => ${JSON.stringify(warehouse)}`,
        );
        throw new ConflictError('warehouse not found');
      }
      const admin = await prisma.user.findUnique({
        where : {
          id : userData.id
        },select : {
          user_public_id : true
        }
      });

      if(admin?.user_public_id !== warehouse.adminGudangId){
        logger.error(
          `[Service - create Item] Error : user not admin ${warehouse?.name} => ${JSON.stringify(admin)}`,
        );
        throw new ConflictError('user not admin' , warehouse?.name);
      }

      // hit db
      const newItem = await this.ItemRepossitory.createItem(ItemDto as Item,userData);
      logger.info(
        `[Service - create Item] Success create Item with this data ${JSON.stringify(newItem)}`,
      );

      return newItem;
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

  async getItem(): Promise<any> {
    try {
      // hit db
      const getItem = await this.ItemRepossitory.getItem();
      logger.info(
        `[Service - create Item] Success create Item with this data ${JSON.stringify(getItem)}`,
      );

      return getItem;
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

  async getItemById(public_id : any): Promise<any> {
    try {
      // hit db
      const getWarehouse = await this.ItemRepossitory.getItemById(public_id);
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
