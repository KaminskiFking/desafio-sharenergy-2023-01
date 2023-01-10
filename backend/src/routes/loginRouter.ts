import express from 'express';
import { registerController, userController } from '../controllers/loginUserController';
import validateUser from '../middlewares/userValid';

export const userRouter = express.Router();

userRouter.post('/login', validateUser, registerController);
