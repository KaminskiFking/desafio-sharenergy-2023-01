import { Request, Response, NextFunction} from 'express'
import jwt from 'jsonwebtoken';
import { secret } from '../middlewares/jwtConfig';

export default function validateToken(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const token = req.header('Authorization');
  if (!token) {
  return res.status(400).json({ message: 'Token not found' });
  }
    try {
  jwt.verify(token, secret);
  next();
  } catch (error) {
  return res.status(400).json({ message: 'Expired or invalid token' });
  }

  next();
}
module.exports = {
  validateToken,
};