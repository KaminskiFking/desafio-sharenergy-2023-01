import express from 'express';
import { ClientController, ClientDeleteController, ClientFindAllController, ClientUpdateController } from '../controllers/ClientController';
import { registerController } from '../controllers/loginUserController';
import validateUser from '../middlewares/userValid';
import validateClient from '../middlewares/validateClient';
import ValidClient from '../middlewares/validateClient';
import validateToken from '../middlewares/validateToken';

export const userRouter = express.Router();

userRouter.post('/login', validateUser, registerController);
userRouter.post('/clients',validateToken, validateClient, ClientController)
userRouter.get('/clients',validateToken, ClientFindAllController)
userRouter.put('/clients/:id', validateToken, validateClient, ClientUpdateController)
userRouter.delete('/clients/:id', validateToken, ClientDeleteController)
