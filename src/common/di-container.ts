import { Container } from 'inversify';
import { TYPES } from './types';
import type { IAuthRepository } from '../modules/auth/interfaces/auth.repository.interface';
import { AuthRepository } from '../modules/auth/repositories/auth.repository';
import type { IAuthService } from '../modules/auth/interfaces/auth.service.interface';
import { AuthService } from '../modules/auth/services/auth.service';
import { AuthController } from '../modules/auth/controllers/auth.controller';
import { WarehouseService } from '../modules/warehouse/services/warehouse.service';
import type { IWarehouseService } from '../modules/warehouse/interfaces/warehouse.service.interface';
import { WarehouseRepository } from '../modules/warehouse/repositories/warehouse.repository';
import type { IWarehouseRepository } from '../modules/warehouse/interfaces/warehouse.repository.interface';
import { WarehouseController } from '../modules/warehouse/controllers/warehouse.controller';
import { ItemService } from '../modules/item/services/item.service';
import type { IItemService } from '../modules/item/interfaces/item.service.interface';
import type { IItemRepository } from '../modules/item/interfaces/item.repository.interface';
import { ItemRepository } from '../modules/item/repositories/item.repository';
import { ItemController } from '../modules/item/controllers/item.controller';
import type{ IItemInService } from '../modules/itemIn/interfaces/itemIn.service.interface';
import { ItemInService } from '../modules/itemIn/services/itemIn.service';
import type { IItemInRepository } from '../modules/itemIn/interfaces/itemIn.repository.interface';
import { ItemInRepository } from '../modules/itemIn/repositories/itemIn.repository';
import { ItemInController } from '../modules/itemIn/controllers/itemIn.controller';
import type { IItemOutService } from '../modules/itemOut/interfaces/itemOut.service.interface';
import { ItemOutService } from '../modules/itemOut/services/itemOut.service';
import type { IItemOutRepository } from '../modules/itemOut/interfaces/itemOut.repository.interface';
import { ItemOutRepository } from '../modules/itemOut/repositories/itemOut.repository';
import { ItemOutController } from '../modules/itemOut/controllers/itemOut.controller';

const container = new Container();

// Bind service
container.bind<IAuthService>(TYPES.AuthService).to(AuthService);
container.bind<IWarehouseService>(TYPES.WarehouseService).to(WarehouseService);
container.bind<IItemService>(TYPES.ItemService).to(ItemService);
container.bind<IItemInService>(TYPES.ItemInService).to(ItemInService);
container.bind<IItemOutService>(TYPES.ItemOutService).to(ItemOutService);
// Bind Repository
container.bind<IAuthRepository>(TYPES.AuthRepository).to(AuthRepository);
container.bind<IWarehouseRepository>(TYPES.WarehouseRepository).to(WarehouseRepository);
container.bind<IItemRepository>(TYPES.ItemRepository).to(ItemRepository);
container.bind<IItemInRepository>(TYPES.ItemInRepository).to(ItemInRepository);
container.bind<IItemOutRepository>(TYPES.ItemOutRepository).to(ItemOutRepository);

// Bind controllers
container.bind<AuthController>(AuthController).toSelf();
container.bind<WarehouseController>(WarehouseController).toSelf();
container.bind<ItemController>(ItemController).toSelf();
container.bind<ItemInController>(ItemInController).toSelf();
container.bind<ItemOutController>(ItemOutController).toSelf();

export { container };
