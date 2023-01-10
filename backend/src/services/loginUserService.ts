import { User } from '../models/loginUserModel';
import { TUser } from '../types/types';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'
import { secret, config } from '../middlewares/jwtConfig';

const loginValidateUserService = async (login: TUser) => {
  const {username, password} = login;

  const userValidate = await User.findOne({username: username})
  if(!userValidate) {
  return {status: 400, message: 'Email or password invalid'};
  }
  const passwordValidate = bcrypt.compareSync(password, userValidate.password);
  if(!passwordValidate) {
    return {status: 400, message: 'Email or password invalid' };
  };

  const token = jwt.sign({ userValidate }, secret, config);
  const data = { token };
  return { status: 201, data };
};

export default {
  loginValidateUserService,
};