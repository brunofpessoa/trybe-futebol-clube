import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';
import httpStatus from '../helpers/httpStatus';

export default class MatchesController {
  static async getAll(_req: Request, res: Response) {
    const data = await MatchesService.getAll();

    res.status(httpStatus.success).json(data);
  }
}
