import express from 'express';
import { container } from '../../../common/di-container';
import { WarehouseController } from '../controllers/warehouse.controller';
import { middlewareJwt } from '../../../middleware/jwt.middleware';

const warehouseRouter = express.Router();
const warehouseController = container.get<WarehouseController>(WarehouseController);

warehouseRouter.post('/register',middlewareJwt, warehouseController.register.bind(warehouseController));
warehouseRouter.get('/getAllWarehouse', warehouseController.getAllWarehouse.bind(warehouseController));
warehouseRouter.get('/:public_id',middlewareJwt, warehouseController.getWarehouseById.bind(warehouseController));




export default warehouseRouter;
