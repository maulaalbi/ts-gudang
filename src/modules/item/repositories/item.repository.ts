import { injectable } from 'inversify';
import { Item } from '@prisma/client';
import { prisma } from '../../../config/prisma';
import { IItemRepository } from '../interfaces/item.repository.interface';


@injectable()
export class ItemRepository implements IItemRepository {


  async createItem(newItem: Item): Promise<Item> {
    const Item = await prisma.item.create({
      data: newItem,
      omit: {
        id: true,
      }
    });

   

    return Item as Item;
  }

  async getItem() : Promise<any> {
    const Items = await prisma.item.findMany({
      include : {
        
        itemIn : true
        
      }
    });
    
    // const result = Items.map((item) => ({
    //   publicItemId: item.public_item_id,
    //   name: item.name,
    //   description: item.description,
    //   stock: item.stock,
    //   warehouseName: item.warehouse?.name, // Ambil nama warehouse
    //   kepalaName: `${item.warehouse?.kepala?.firstName} ${item.warehouse?.kepala?.lastName}`, // Ambil nama kepala warehouse
    //   location : item.warehouse?.location,
    // }));

    return Items;
    
  }
  
  async getItemById(public_id : any) : Promise<any> {
    const Items = await prisma.item.findMany({
      where: {
        public_item_id: public_id,
      },
      
      
    });
    
    const result = Items.map((item) => ({
      publicItemId: item.public_item_id,
      name: item.name,
      description: item.description,
      stock: item.stock,
    }));

    return result;
  }
}
