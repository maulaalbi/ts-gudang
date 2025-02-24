import type { Role } from '@prisma/client';

export interface IRoleRepository {
  createRole(newRole: Role): Promise<Role>;
  getRole() : Promise<any>;
  
}
