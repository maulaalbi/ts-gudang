import express from 'express';
import { container } from '../../../common/di-container';
import { ItemOutController } from '../controllers/itemOut.controller';
import { middlewareJwt } from '../../../middleware/jwt.middleware';

const itemOutRouter = express.Router();
const itemOutController = container.get<ItemOutController>(ItemOutController);

itemOutRouter.post('/register', middlewareJwt, itemOutController.register.bind(itemOutController));
itemOutRouter.get('/getAllitemOut', itemOutController.getAllItemOut.bind(itemOutController));
itemOutRouter.get('/:public_id', itemOutController.getItemOutById.bind(itemOutController));




export default itemOutRouter;
