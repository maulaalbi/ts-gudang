import { injectable } from 'inversify';
import { ItemOut } from '@prisma/client';
import { prisma } from '../../../config/prisma';
import { IItemOutRepository } from '../interfaces/itemOut.repository.interface';


@injectable()
export class ItemOutRepository implements IItemOutRepository {


  async createItemOut(newItemOut: ItemOut,userData :any): Promise<ItemOut> {

    const updateStock = await prisma.item.update({
      where: {
        public_item_id : newItemOut.itemId
      },
      data : {
        stock:{
          decrement : newItemOut.quantity
        }
      }
    });

    if (updateStock.stock < 0) {
      throw new Error('Stok barang tidak mencukupi');
    }
    
    const ItemOut = await prisma.itemOut.create({
      data:{
        itemId: newItemOut.itemId, // ID item
        quantity : newItemOut.quantity
      }
    });
    
    


    return ItemOut as ItemOut;
  }

  async getItemOut() : Promise<any> {
    const ItemsIn = await prisma.itemOut.findMany({
    });
    

    return ItemsIn;
    
  }
  
  async getItemOutById(public_id : any) : Promise<any> {
    const Items = await prisma.itemOut.findMany({
      where: {
        itemId : public_id
      },
      
    });
    

    return Items;
  }
}
