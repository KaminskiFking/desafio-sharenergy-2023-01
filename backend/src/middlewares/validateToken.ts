import { Request, Response, NextFunction } from 'express';
import { secret } from '../middlewares/jwtConfig';
import jwt from 'jsonwebtoken';

const validateToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }

    jwt.verify(authorization, secret);

    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

export default validateToken;