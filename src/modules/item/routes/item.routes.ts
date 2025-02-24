import express from 'express';
import { container } from '../../../common/di-container';
import { ItemController } from '../controllers/item.controller';

const itemRouter = express.Router();
const itemController = container.get<ItemController>(ItemController);

itemRouter.post('/register', itemController.register.bind(itemController));
itemRouter.get('/getAllitem', itemController.getAllItem.bind(itemController));
itemRouter.get('/:public_id', itemController.getItemById.bind(itemController));




export default itemRouter;
