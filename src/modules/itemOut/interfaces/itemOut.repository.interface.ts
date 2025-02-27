import type {  ItemOut } from '@prisma/client';

export interface IItemOutRepository {
  createItemOut(newItemOut: ItemOut,userData :any): Promise<ItemOut>;
  getItemOut() : Promise<any>;
  getItemOutById(public_id :any) : Promise<any>;

  
}
