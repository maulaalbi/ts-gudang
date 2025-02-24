import type { User } from '@prisma/client';

export interface IAuthService {
  register(userRegisterDto: User): Promise<User>;
  login(request:any) : Promise<any>;
  getUserLogin(id : number): Promise<any>;
  getAllUsers(): Promise<any>;

}
