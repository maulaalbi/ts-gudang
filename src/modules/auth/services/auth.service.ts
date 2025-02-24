import { inject, injectable } from 'inversify';
import { IAuthService } from '../interfaces/auth.service.interface';
import { TYPES } from '../../../common/types';
import { IAuthRepository } from '../interfaces/auth.repository.interface';
import { User } from '@prisma/client';
import logger from '../../../common/logger';
import { loginValidation, registerValidation } from '../validation/auth.validatoin';
import { ZodError } from 'zod';
import { convertErrorValidationToList } from '../../../helper/converter/convertErrorValidationToList';
import { ConflictError } from '../../../common/error-handler/conflict-error';
import { ValidationError } from '../../../common/error-handler/validation-error';

@injectable()
export class AuthService implements IAuthService {
  constructor(
    @inject(TYPES.AuthRepository) private authRepossitory: IAuthRepository,
  ) {}

  async register(userDto: any): Promise<any> {
    try {
      // validate
      const validated = registerValidation.parse(userDto);

      // Check is user already exist
      const findUser = await this.authRepossitory.findByEmail(userDto.email);
      if (findUser) {
        logger.error(
          `[Service - register] Error : User already exist => ${JSON.stringify(findUser)}`,
        );
        throw new ConflictError('User already exist');
      }

      // hit db
      const newUser = await this.authRepossitory.createUser(validated as User);
      logger.info(
        `[Service - register] Success create user with this data ${JSON.stringify(newUser)}`,
      );

      return newUser;
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

  async login(request : any): Promise<any> {
    try {
      
      const validate = loginValidation.parse(request);

       // hit db
       const user = await this.authRepossitory.login(validate);
       logger.info(
         `[Service - login] Success login user with this data ${JSON.stringify(user)}`,
       );
       return user;
      
    }  catch (error: any) {
      if (error instanceof ZodError) {
        const validationError = convertErrorValidationToList(error);
        logger.error(
          `[Service - login] Validation Error : ${JSON.stringify(validationError)}`,
        );
        throw new ValidationError('Data is invalid', validationError);
      }

      throw error;
    }
  }

  async getUserLogin(id: number): Promise<any> {
      
    try{
     const getLogin = await this.authRepossitory.getUserLogin(id);
     logger.info(
       `[Service - get User Login] Success get user with this data ${JSON.stringify(getLogin)}`,
     );
     return getLogin;
    } catch (error: any) {
     if (error instanceof ZodError) {
       const validationError = convertErrorValidationToList(error);
       logger.error(
         `[Service - get login user] Validation Error : ${JSON.stringify(validationError)}`,
       );
       throw new ValidationError('Data is invalid', validationError);
     }
 
     throw error;
   }
   }

   async getAllUsers(): Promise<any> {
      
    try{
     const allUser = await this.authRepossitory.getAllUsers();
     logger.info(
       `[Service - get User Login] Success get user with this data ${JSON.stringify(allUser)}`,
     );
     return allUser;
    } catch (error: any) {
     if (error instanceof ZodError) {
       const validationError = convertErrorValidationToList(error);
       logger.error(
         `[Service - get login user] Validation Error : ${JSON.stringify(validationError)}`,
       );
       throw new ValidationError('Data is invalid', validationError);
     }
 
     throw error;
   }
   }
}
