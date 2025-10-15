import bcrypt from 'bcrypt';
import UserModel from '../models/user-model';
import jwt from 'jsonwebtoken';

export const createUser = async(userData: any) => {
  const { name, email, password } = userData;
  const user = await UserModel.findOne({ email });
  if(user){
    throw new Error('User already exists');
  }
  else{
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({name, email, password: hashedPassword});
    return await newUser.save();
  }
}

export const loginUserService = async(userData: any) => {
  const { email, password } = userData;
  const user = await UserModel.findOne({ email });
  if(!user){
    throw new Error('Invalid User');
  }
  else{
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
    throw new Error('Invalid email or password');
    }
    // Generate JWT token
  const payload = {
    userId: user._id,
    email: user.email
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: '1h'
  });

  return token;
  }
}