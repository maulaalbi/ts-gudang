import { injectable } from 'inversify';
import { Role } from '@prisma/client';
import { prisma } from '../../../config/prisma';
import { IRoleRepository } from '../interfaces/roles.repository.interface';


@injectable()
export class RoleRepository implements IRoleRepository {


  async createRole(newRole: Role): Promise<Role> {
    const role = await prisma.role.create({
      data: newRole,
      omit: {
        id: true,
      },
    });

    return role as Role;
  }

  async getRole() : Promise<any> {
    return await prisma.role.findMany();
  }
  
}
