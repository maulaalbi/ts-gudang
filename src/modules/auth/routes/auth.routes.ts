import express from 'express';
import { container } from '../../../common/di-container';
import { AuthController } from '../controllers/auth.controller';
import { middlewareJwt } from '../../../middleware/jwt.middleware';

const authRouter = express.Router();
const authController = container.get<AuthController>(AuthController);

authRouter.post('/register', authController.register.bind(authController));
authRouter.post('/login', authController.login.bind(authController));
authRouter.get('/getMe',middlewareJwt, authController.getUserLogin.bind(authController));
authRouter.get('/getAll', authController.getAllUser.bind(authController));



export default authRouter;
