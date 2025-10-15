import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import UserModel from '../models/user-model';

dotenv.config();

export interface AuthenticatedRequest extends Request {
  user?: any; // or a more specific type like { userId: string; email: string }
}

interface AuthTokenPayload extends jwt.JwtPayload {
  userId: string;
}

export async function verifyToken(req: AuthenticatedRequest, res: Response, next: NextFunction){
  const authHeader = req.headers.authorization;
  if(!authHeader || !authHeader.startsWith('Bearer'))
  {
    res.status(401).json({ error: 'Unauthorized: No token provided' });
    return;
  }
  const token = authHeader.split(' ')[1];
  try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as AuthTokenPayload;
    const user = await UserModel.findById(decoded.userId).select('-password --v');
    if (!user) {
      res.status(401).json({ error: 'User not found' });
      return;
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
    return
  }
}