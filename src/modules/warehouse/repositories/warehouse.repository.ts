import { injectable } from 'inversify';
import { Warehouse } from '@prisma/client';
import { prisma } from '../../../config/prisma';
import { IWarehouseRepository } from '../interfaces/warehouse.repository.interface';


@injectable()
export class WarehouseRepository implements IWarehouseRepository {


  async createWarehouse(newWarehouse: any): Promise<any> {
    
    const warehouse = await prisma.warehouse.create({
      data: {
        name : newWarehouse.name,
        location : newWarehouse.location,
        adminGudangId : newWarehouse.adminGudangId
      },
      omit: {
        id: true,
      },
    });

   

    return warehouse as Warehouse;
  }

  async getWarehouse() : Promise<any> {
    const warehouses = await prisma.warehouse.findMany({

      select: {
        name:true,
        location:true,
        createdAt:true,
        updatedAt:true,
        adminGudang :{
          select: {
            firstName : true,
            lastName : true,
            email: true,
          },
        } ,
        item : {
          select:{
            public_item_id : true,
            name : true,
            description : true,
            stock :true
          }
        },  // Memuat data item yang dimiliki warehouse ini
      },
    });
    
 

    return warehouses;
    
  }
  
  async getWarehouseById(public_id : any) : Promise<any> {
    const warehouse = await prisma.warehouse.findMany({
      where: {
        public_warehouse_id: public_id,
      },
      
    });
    
    const result = warehouse.map((warehouse) => ({
      publicWarehouseId: warehouse.public_warehouse_id,
      name: warehouse.name,
      location: warehouse.location,
      createdAt: warehouse.createdAt,
      updatedAt: warehouse.updatedAt,
    }));

    return result;
  }
}
