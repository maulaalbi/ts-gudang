import { Container } from 'inversify';
import { TYPES } from './types';
import type { IAuthRepository } from '../modules/auth/interfaces/auth.repository.interface';
import { AuthRepository } from '../modules/auth/repositories/auth.repository';
import type { IAuthService } from '../modules/auth/interfaces/auth.service.interface';
import { AuthService } from '../modules/auth/services/auth.service';
import { AuthController } from '../modules/auth/controllers/auth.controller';
import type { IRoleService } from '../modules/role/interfaces/roles.service.interface';
import { RoleService } from '../modules/role/services/roles.service';
import type{ IRoleRepository } from '../modules/role/interfaces/roles.repository.interface';
import { RoleRepository } from '../modules/role/repositories/roles.repository';
import { RoleController } from '../modules/role/controllers/roles.controller';
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

const container = new Container();

// Bind service
container.bind<IAuthService>(TYPES.AuthService).to(AuthService);
container.bind<IRoleService>(TYPES.RoleService).to(RoleService);
container.bind<IWarehouseService>(TYPES.WarehouseService).to(WarehouseService);
container.bind<IItemService>(TYPES.ItemService).to(ItemService);
container.bind<IItemInService>(TYPES.ItemInService).to(ItemInService);
// Bind Repository
container.bind<IAuthRepository>(TYPES.AuthRepository).to(AuthRepository);
container.bind<IRoleRepository>(TYPES.RoleRepository).to(RoleRepository);
container.bind<IWarehouseRepository>(TYPES.WarehouseRepository).to(WarehouseRepository);
container.bind<IItemRepository>(TYPES.ItemRepository).to(ItemRepository);
container.bind<IItemInRepository>(TYPES.ItemInRepository).to(ItemInRepository);

// Bind controllers
container.bind<AuthController>(AuthController).toSelf();
container.bind<RoleController>(RoleController).toSelf();
container.bind<WarehouseController>(WarehouseController).toSelf();
container.bind<ItemController>(ItemController).toSelf();
container.bind<ItemInController>(ItemInController).toSelf();

export { container };
