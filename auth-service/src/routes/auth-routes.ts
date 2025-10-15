import express from 'express';
import { registerUser, loginUser } from '../controllers/auth-controller';
import { getUserDetails } from '../controllers/auth-controller';
import { verifyToken } from '../middlewares/auth-middleware';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/me', verifyToken, getUserDetails)

export default router;