import { injectable } from 'inversify';
import { ItemIn } from '@prisma/client';
import { prisma } from '../../../config/prisma';
import { IItemInRepository } from '../interfaces/itemIn.repository.interface';


@injectable()
export class ItemInRepository implements IItemInRepository {


  async createItemIn(newItemIn: ItemIn): Promise<ItemIn> {

    

    const ItemIn = await prisma.itemIn.create({
      data:{
        itemId: newItemIn.itemId, // ID item
        adminGudangId: newItemIn.adminGudangId,
        quantity : newItemIn.quantity
      }
    });
    
    const sumQuantity = await prisma.itemIn.aggregate({
      where : {
        itemId : newItemIn.itemId
      },
      _sum : {
        quantity : true
      }
    });

    const quantitySum = sumQuantity._sum.quantity || 0;

    const item = await prisma.item.update({
      where : { 
        public_item_id : newItemIn.itemId
      },
      data: {
        stock : quantitySum,
      },select :{
        warehouseId : true
      }
    });

  
  
   

    return ItemIn as ItemIn;
  }

  async getItemIn() : Promise<any> {
    const ItemsIn = await prisma.itemIn.findMany({
      
    });
    
    // const result = ItemsIn.map((itemIn) => ({
    //   publicItemInId: itemIn.public_itemsIn_id,
    //   itemName : itemIn.item.name,
    //   quantity : itemIn.quantity,
    //   itemDescription : itemIn.item.description,
    //   createdAt : itemIn.timestamp

    // }));

    return ItemsIn;
    
  }
  
  async getItemInById(public_id : any) : Promise<any> {
    const Items = await prisma.itemIn.findMany({
      where: {
        itemId : public_id
      },
      
    });
    

    return Items;
  }
}
