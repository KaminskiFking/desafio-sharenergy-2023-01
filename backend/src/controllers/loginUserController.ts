import { Request, Response } from "express";
import loginUserService from "../services/loginUserService";
import { TUser } from "../types/types";

export const registerController = async(req: Request, res: Response) => {

  const login = req.body as TUser;
  const { status, message, data } = await loginUserService.loginValidateUserService(login);
  if(message) {
    return res.status(status).json({ message });
  }
  return res.status(status).json(data);
}

export const userController = async(req: Request, res: Response) => {
  return res.status(200).json({message: 'login feito com sucesso'});
}