import type {  ItemIn } from '@prisma/client';

export interface IItemInRepository {
  createItemIn(newItemIn: ItemIn,userData :any): Promise<ItemIn>;
  getItemIn() : Promise<any>;
  getItemInById(public_id :any) : Promise<any>;

  
}
