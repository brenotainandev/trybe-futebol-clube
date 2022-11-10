import { Request, Response, NextFunction } from 'express';
import jwtToken from '../utils/jwtToken';
import StatusCode from '../types/status.code.types';
import Users from '../database/models/UserModel';
import LoginService from '../services/login.service';

const loginService = new LoginService(Users);

export default {
  login: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token: string = await loginService.getUser(req.body);

      res.status(Number(StatusCode.OK)).json({ token });
    } catch (erro) {
      next(res.status(Number(StatusCode.UNAUTHORIZED))
        .json({ message: 'Incorrect email or password' }));
    }
  },

  loginValidate: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization as string;
      const data = jwtToken.validation(token);
      const { role } = data as Users;

      res.status(Number(StatusCode.OK)).json({ role });
    } catch (erro) {
      next(res.status(Number(StatusCode.UNAUTHORIZED))
        .json({ message: 'Token must be a valid token' }));
    }
  },
};
