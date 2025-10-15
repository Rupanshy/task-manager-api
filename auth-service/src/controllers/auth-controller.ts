import { Request, Response } from 'express';
import { createUser, loginUserService } from '../services/auth-service';
import { AuthenticatedRequest } from '../middlewares/auth-middleware';

export async function registerUser(req: Request, res: Response){
    console.log('Registering User');

    try{
       const user = await createUser(req.body);
       res.status(201).json({ message: 'User registered successfully', user });
    }
    catch (error: any) {
    res.status(400).json({ error: error.message });
  } 
}

export async function loginUser(req: Request, res: Response){
    console.log('User is logging in');
    try{
       const user = await loginUserService(req.body);
       res.status(201).json({ message: 'User registered successfully', user });
    }
    catch (error: any) {
    res.status(400).json({ error: error.message });
  } 
}

export async function getUserDetails( req: AuthenticatedRequest, res: Response)
{
  res.status(200).json({ user: req.user });
}