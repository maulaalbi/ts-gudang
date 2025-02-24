import express from 'express';
import { container } from '../../../common/di-container';
import { RoleController } from '../controllers/roles.controller';

const roleRouter = express.Router();
const roleController = container.get<RoleController>(RoleController);

roleRouter.post('/register', roleController.register.bind(roleController));
roleRouter.get('/getAll', roleController.getAllRole.bind(roleController));



export default roleRouter;
