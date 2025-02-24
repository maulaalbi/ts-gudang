import express from 'express';
import { container } from '../../../common/di-container';
import { ItemInController } from '../controllers/itemIn.controller';

const itemInRouter = express.Router();
const itemInController = container.get<ItemInController>(ItemInController);

itemInRouter.post('/register', itemInController.register.bind(itemInController));
itemInRouter.get('/getAllitemIn', itemInController.getAllItemIn.bind(itemInController));
itemInRouter.get('/:public_id', itemInController.getItemInById.bind(itemInController));




export default itemInRouter;
