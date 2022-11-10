import * as Jwt from 'jsonwebtoken';
import 'dotenv/config';
import StatusCode from '../types/status.code.types';
import HttpError from '../shared/HttpError';
import IUser from '../interfaces/IUser';

const secret = process.env.JWT_SECRET || 'jwt_secret';

export default {
  generate: (userData: IUser) => {
    const { id, username, email, role } = userData;

    const user: IUser = { id, username, email, role };

    return Jwt.sign(user, secret, {
      expiresIn: '1d',
      algorithm: 'HS256',
    });
  },

  validation: (token: string) => {
    try {
      const decodedtoken = Jwt.verify(token, secret) as Jwt.JwtPayload;

      return decodedtoken;
    } catch (error) {
      throw new HttpError(Number(StatusCode.UNAUTHORIZED), 'Token must be a valid token');
    }
  },
};
