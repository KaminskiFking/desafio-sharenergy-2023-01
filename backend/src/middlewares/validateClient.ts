import { Request, Response, NextFunction } from 'express';
const Joi = require('joi');

const validateClient = (req: Request, res: Response, next: NextFunction) => {
  const cpf = /([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/
  const email = /^\S+@\S+\.\S+$/;
  const { error } = Joi.object({

    name: Joi.string().min(3).not().empty()
      .required(),

    email: Joi.string().email().not().empty()
      .required().regex(email),

    telephone: Joi.string().min(11).max(11).not().empty()
      .required(),

    address: Joi.string().min(5).not().empty()
      .required(),

    cpf: Joi.string().min(11).max(11).not().empty()
      .required().regex(cpf),

  }).validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.message });
  }

  next();
};

export default validateClient;