import type { Role } from '@prisma/client';

export interface IRoleService {
  createRole(newRole: Role): Promise<Role>;
  getRole() : Promise<any>;


}
