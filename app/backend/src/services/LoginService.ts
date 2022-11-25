import { isPasswordCompatible } from '../helpers/bcryptjs';
import { ILogin, IToken } from '../interfaces';
import Users from '../database/models/Users';
import { createToken } from '../helpers/jwt';

export default class LoginService {
  static async login(body: ILogin): Promise<IToken | undefined> {
    const { email, password } = body;

    const user = await Users.findOne({ where: { email } });

    if (!user) return;

    const passwordMatches = await isPasswordCompatible(password, user.password);
    if (!passwordMatches) {
      return;
    }

    const tokenBody = {
      id: user.id,
      username: user.username,
      role: user.role,
      email: user.email,
    };

    const token = createToken(tokenBody);
    return { token };
  }
}
