import { Request, Response, NextFunction } from 'express';
import jwtToken from '../utils/jwtToken';
import HttpError from '../shared/HttpError';

export default (req: Request, _res: Response, next: NextFunction): void => {
  const { authorization } = req.headers;

  if (!authorization) throw new HttpError(401, 'Token must be a valid token');

  jwtToken.validation(authorization);

  next();
};
