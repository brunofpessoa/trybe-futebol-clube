import { Request, Response } from 'express';
import LoginService from '../services/LoginService';
import httpStatus from '../helpers/httpStatus';

export default class LoginController {
  static async login(req: Request, res: Response) {
    if (!req.body.email || !req.body.password) {
      return res.status(httpStatus.badRequest).json({ message: 'All fields must be filled' });
    }

    const data = await LoginService.login(req.body);

    const token = data?.token;

    if (token) {
      return res.status(httpStatus.success).json({ token });
    }
    res.status(httpStatus.unauthorized).json({ message: 'Incorrect email or password' });
  }

  static async validate(req: Request, res: Response) {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(httpStatus.unauthorized).json({ message: 'Invalid token' });
    }

    const data = await LoginService.validate(authorization);

    if (!data.role) {
      return res.status(httpStatus.unauthorized).json({ message: 'Invalid token' });
    }

    res.status(httpStatus.success).json({ role: data.role });
  }
}
