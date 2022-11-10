import * as bcrypt from 'bcryptjs';
import HttpError from '../shared/HttpError';
import jwtToken from '../utils/jwtToken';
import StatusCode from '../types/status.code.types';
import Users from '../database/models/UserModel';

class LoginService {
  constructor(private userModel: typeof Users) {}

  public async getUser(userData: { email: string, password: string }): Promise<string> {
    const { email, password } = userData;

    const user: Users | null = await this.userModel.findOne(
      { where: { email } },
    );

    if (!user) throw new HttpError(Number(StatusCode.UNAUTHORIZED), 'Incorrect email or password');

    const validUser = await bcrypt.compare(password, user.password);

    if (!validUser) {
      throw new HttpError(Number(StatusCode.UNAUTHORIZED), 'Incorrect email or password');
    }

    const token = jwtToken.generate(user);

    return token;
  }
}

export default LoginService;
