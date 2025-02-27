import { injectable } from 'inversify';
import { IAuthRepository } from '../interfaces/auth.repository.interface';
import { User } from '@prisma/client';
import { prisma } from '../../../config/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


@injectable()
export class AuthRepository implements IAuthRepository {
  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { email },
      omit: {
        id: true,
        password: true,
      },
    });

    return user as User;
  }

  async createUser(newUser: any): Promise<any> {
    newUser.password = await bcrypt.hash(newUser.password,10);
    const user = await prisma.user.create({
      data: newUser,
      omit:{
        id : true
      }
    });

    return user;
  }

  async login(request: any): Promise<any> {
    const { email, password } = request;
    const user = await prisma.user.findFirst({
      where: { email },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        password: true, // Hanya untuk perbandingan password
      },
    });
  
    // Jika user tidak ditemukan
    if (!user) {
      throw new Error('Email tidak terdaftar');
    }
  
    // Memeriksa password
    const passwordCheck = await bcrypt.compare(password, user.password);
    if (!passwordCheck) {
      throw new Error('Password salah');
    }
  
    // Membuat payload untuk token JWT
    const payload = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    };
  
    // Membuat token JWT
    const secret = process.env.JWT_SECRET_KEY!;
    const expiresIn = 60 * 60 * 1; // 1 jam
    const token = jwt.sign(payload, secret, { expiresIn });
  
    // Mengembalikan data user dan token
    return {
      data: {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      token,
    };
  }

  async getUserLogin(id:number): Promise<any> {
    const user = await prisma.user.findUnique({
        where: {
            id : id,
        },select:{
          firstName : true,
          lastName : true,
          email : true,
          role : true,
          warehouse : true,
        },
       
    });
    return user;
  }

  async getAllUsers(): Promise<any> {
    const user = await prisma.user.findMany({
      select : {
        user_public_id : true,
        firstName : true,
        lastName : true,
        email : true,
        role : true
      }
    });
    return user;
  }
}
