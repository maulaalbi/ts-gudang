
export interface IWarehouseRepository {
  createWarehouse(newWarehouse: any): Promise<any>;
  getWarehouse() : Promise<any>;
  getWarehouseById(public_id :any) : Promise<any>;

  
}
