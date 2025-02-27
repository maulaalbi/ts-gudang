import type {  Item } from '@prisma/client';

export interface IItemRepository {
  createItem(newItem: Item,userData :any): Promise<Item>;
  getItem() : Promise<any>;
  getItemById(public_id :any) : Promise<any>;

  
}
