import type { User } from '@prisma/client';

export interface IAuthRepository {
  findByEmail(email: string): Promise<User | null>;
  createUser(newUser: any): Promise<any>;
  login(request:any) : Promise<any>;
  getUserLogin(id : number): Promise<any>;
  getAllUsers(): Promise<any>;
}
