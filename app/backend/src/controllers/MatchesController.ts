import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';
import httpStatus from '../helpers/httpStatus';

export default class MatchesController {
  static async getAll(req: Request, res: Response) {
    const { inProgress } = req.query;
    const data = await MatchesService.getAll(inProgress as string | undefined);

    res.status(httpStatus.success).json(data);
  }
}
