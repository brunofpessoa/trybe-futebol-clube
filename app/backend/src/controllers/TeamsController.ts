import { Request, Response } from 'express';
import TeamsService from '../services/TeamsService';
import httpStatus from '../helpers/httpStatus';

export default class TeamsController {
  static async getAll(_req: Request, res: Response) {
    const data = await TeamsService.getAll();

    res.status(httpStatus.success).json(data);
  }

  static async getOne(req: Request, res: Response) {
    const { id } = req.params;
    const team = await TeamsService.getOne(id);

    res.status(httpStatus.success).json(team);
  }
}
