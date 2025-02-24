import type { Application } from 'express';
import authRouter from '../modules/auth/routes/auth.routes';
import roleRouter from '../modules/role/routes/roles.routes';
import warehouseRouter from '../modules/warehouse/routes/warehouse.routes';
import itemRouter from '../modules/item/routes/item.routes';
import itemInRouter from '../modules/itemIn/routes/itemIn.routes';

export const RegisterRoutes = (app: Application): void => {
  app.use('/api/auth', authRouter);
  app.use('/api/role', roleRouter);
  app.use('/api/warehouse', warehouseRouter);
  app.use('/api/items', itemRouter);
  app.use('/api/itemsIn', itemInRouter);
};
