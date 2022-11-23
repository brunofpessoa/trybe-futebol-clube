import { isPasswordCompatible } from '../helpers/bcryptjs';
import { ILogin, IToken } from '../interfaces';
import Users from '../database/models/Users';
import { createToken } from '../helpers/jwt';

export default class LoginService {
  static async login(body: ILogin): Promise<IToken | undefined> {
    const { email, password } = body;

    const data = await Users.findOne({ where: { email } });
    const user = data?.dataValues;

    if (!user) {
      return;
    }
    const { password: userPassword } = user;
    const passwordMatches = await isPasswordCompatible(password, userPassword);

    if (!passwordMatches) {
      return;
    }

    const { password: _, ...userWithoutPassword } = user;
    const token = createToken(userWithoutPassword);
    return { token };
  }
}
