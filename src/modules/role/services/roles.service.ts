import { inject, injectable } from 'inversify';
import { TYPES } from '../../../common/types';
import { Role} from '@prisma/client';
import logger from '../../../common/logger';
import { ZodError } from 'zod';
import { ValidationError } from '../../../common/error-handler/validation-error';
import { IRoleService } from '../interfaces/roles.service.interface';
import { IRoleRepository } from '../interfaces/roles.repository.interface';
import { convertErrorValidationToList } from '../../../helper/converter/convertErrorValidationToList';

@injectable()
export class RoleService implements IRoleService {
  constructor(
    @inject(TYPES.RoleRepository) private roleRepossitory: IRoleRepository,
  ) {}

  async createRole(roleDto: Role): Promise<Role> {
    try {

      // hit db
      const newRole = await this.roleRepossitory.createRole(roleDto as Role);
      logger.info(
        `[Service - create role] Success create role with this data ${JSON.stringify(newRole)}`,
      );

      return newRole;
    } catch (error: any) {
      if (error instanceof ZodError) {
        const validationError = convertErrorValidationToList(error);
        logger.error(
          `[Service - register] Validation Error : ${JSON.stringify(validationError)}`,
        );
        throw new ValidationError('Data is invalid', validationError);
      }

      throw error;
    }
  }

  async getRole(): Promise<any> {
    try {
      // hit db
      const getRole = await this.roleRepossitory.getRole();
      logger.info(
        `[Service - create role] Success create role with this data ${JSON.stringify(getRole)}`,
      );

      return getRole;
    } catch (error: any) {
      if (error instanceof ZodError) {
        const validationError = convertErrorValidationToList(error);
        logger.error(
          `[Service - register] Validation Error : ${JSON.stringify(validationError)}`,
        );
        throw new ValidationError('Data is invalid', validationError);
      }

      throw error;
    }
  }

}
