import { NextFunction, Request, Response } from 'express';
import { TUser } from '../types/types';

export default function validateUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { username, password } = req.body as TUser;

  if (!username) {
    const message = '"username" is required';
    return res.status(400).json({ message });
  }

  if (!password) {
    const message = '"password" is required';
    return res.status(400).json({ message });
  }

  next();
}