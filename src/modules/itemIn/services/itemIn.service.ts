import { inject, injectable } from 'inversify';
import { TYPES } from '../../../common/types';
import { ItemIn} from '@prisma/client';
import logger from '../../../common/logger';
import { ZodError } from 'zod';
import { ValidationError } from '../../../common/error-handler/validation-error';
import { IItemInService } from '../interfaces/itemIn.service.interface';
import { IItemInRepository } from '../interfaces/itemIn.repository.interface';
import { convertErrorValidationToList } from '../../../helper/converter/convertErrorValidationToList';
import { prisma } from '../../../config/prisma';
import { ConflictError } from '../../../common/error-handler/conflict-error';

@injectable()
export class ItemInService implements IItemInService {
  constructor(
    @inject(TYPES.ItemInRepository) private ItemInRepossitory: IItemInRepository,
  ) {}

  async createItemIn(ItemInDto: ItemIn,userData :any): Promise<ItemIn> {
    try {
      const item = await prisma.item.findUnique({
        where : {
          public_item_id : ItemInDto.itemId
        },select:{
          warehouseId : true
        }
      });
      if (!item) {
        logger.error(
          `[Service - item] Error : item not found => ${JSON.stringify(item)}`,
        );
        throw new ConflictError('item not found');
      }
      const warehouse = await prisma.warehouse.findUnique({
        where: {
          public_warehouse_id : item?.warehouseId
        },select : {
          adminGudangId : true,
          name : true
        }
      });
      
      const admin = await prisma.user.findUnique({
        where : {
          id : userData.id
        },select :{
          user_public_id : true
        }
          
      });

      if(admin?.user_public_id !== warehouse?.adminGudangId){
        logger.error(
          `[Service - create Item In] Error : user not admin gudang => ${JSON.stringify(admin)}`,
        );
        throw new ConflictError('user not admin' , warehouse?.name);
      }
   
      // hit db
      const newItemIn = await this.ItemInRepossitory.createItemIn(ItemInDto as ItemIn,userData);
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
