import { inject, injectable } from 'inversify';
import { TYPES } from '../../../common/types';
import {  ItemOut} from '@prisma/client';
import logger from '../../../common/logger';
import { ZodError } from 'zod';
import { ValidationError } from '../../../common/error-handler/validation-error';
import { convertErrorValidationToList } from '../../../helper/converter/convertErrorValidationToList';
import { prisma } from '../../../config/prisma';
import { ConflictError } from '../../../common/error-handler/conflict-error';
import { IItemOutService } from '../interfaces/itemOut.service.interface';
import { IItemOutRepository } from '../interfaces/itemOut.repository.interface';

@injectable()
export class ItemOutService implements IItemOutService {
  constructor(
    @inject(TYPES.ItemOutRepository) private ItemOutRepossitory: IItemOutRepository,
  ) {}

  async createItemOut(ItemOutDto: ItemOut,userData :any): Promise<ItemOut> {
    try {
      const item = await prisma.item.findUnique({
        where : {
          public_item_id : ItemOutDto.itemId
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
          `[Service - create Item In] Error : user not admin Gudang => ${JSON.stringify(admin)}`,
        );
        throw new ConflictError('user not admin', warehouse?.name);
      }
   
      // hit db
      const newItemOut = await this.ItemOutRepossitory.createItemOut(ItemOutDto as ItemOut,userData);
      logger.info(
        `[Service - create Item] Success create Item with this data ${JSON.stringify(newItemOut)}`,
      );

      return newItemOut;
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

  async getItemOut(): Promise<any> {
    try {
      // hit db
      const getItemOut = await this.ItemOutRepossitory.getItemOut();
      logger.info(
        `[Service - create ItemOut] Success create ItemOut with this data ${JSON.stringify(getItemOut)}`,
      );

      return getItemOut;
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

  async getItemOutById(public_id : any): Promise<any> {
    try {
      // hit db
      const getItemOut = await this.ItemOutRepossitory.getItemOutById(public_id);
      logger.info(
        `[Service - get ItemOut By Id] Success create ItemOut with this data ${JSON.stringify(getItemOut)}`,
      );

      return getItemOut;
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
