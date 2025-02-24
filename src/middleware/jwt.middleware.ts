import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { prisma } from '../config/prisma';

interface UserData {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
}

interface ValidationRequest extends Request {
  userData?: UserData;
}

export const middlewareJwt = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const validationReq = req as ValidationRequest;
  const  authorization  = validationReq.headers.authorization;

  if (!authorization || !authorization.startsWith('Bearer ')) {
   res.status(401).json({
      status: false,
      message: 'Authorization header missing or invalid',
    });
    return;
  }

  const token = authorization.split(' ')[1];
  const secret = process.env.JWT_SECRET_KEY!;

  try {
    const jwtDecode = jwt.verify(token, secret) as UserData;

    // Validasi ulang user dari database
    const user = await prisma.user.findUnique({
      where: { id: jwtDecode.id },
    });

    if (!user) {
       res.status(401).json({
        status: false,
        message: 'User not found or token invalid',
      });
    }

    validationReq.userData = jwtDecode;
    res.locals.userData = jwtDecode;
    next();
  } catch (error) {
    console.error('JWT verification error:', error);
     res.status(401).json({
      status: false,
      message: 'Invalid or expired token',
    });
  }
};
