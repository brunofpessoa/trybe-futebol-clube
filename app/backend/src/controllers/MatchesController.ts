import { Request, Response } from 'express';
import { validateToken } from '../helpers/jwt';
import MatchesService from '../services/MatchesService';
import httpStatus from '../helpers/httpStatus';

export default class MatchesController {
  static async getAll(req: Request, res: Response) {
    const { inProgress } = req.query;
    const data = await MatchesService.getAll(inProgress as string | undefined);

    res.status(httpStatus.success).json(data);
  }

  static async insert(req: Request, res: Response) {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(httpStatus.badRequest).json({ message: 'Missing token' });
    }

    if (!('homeTeam' && 'awayTeam' && 'homeTeamGoals' && 'awayTeamGoals' in req.body)) {
      return res.status(httpStatus.badRequest).json({ message: 'Fields are missing' });
    }

    try {
      validateToken(authorization);
      const data = await MatchesService.insert(req.body);
      if ('httpStatus' in data) {
        return res.status(data.httpStatus).json({ message: data.message });
      }
      res.status(httpStatus.created).json(data);
    } catch {
      return res.status(httpStatus.unauthorized).json({ message: 'Token must be a valid token' });
    }
  }

  static async update(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;

    if (!homeTeamGoals || !awayTeamGoals) {
      return res.status(httpStatus.badRequest).json({ message: 'Fields are missing' });
    }

    const data = await MatchesService.update(id, homeTeamGoals, awayTeamGoals);

    if ('httpStatus' in data) {
      return res.status(data.httpStatus).json({ message: data.message });
    }

    return res.status(httpStatus.success).json({ affectedCount: data });
  }

  static async finish(req: Request, res: Response) {
    const { id } = req.params;
    const data = await MatchesService.finish(id);

    if ('httpStatus' in data) {
      return res.status(data.httpStatus).json({ message: data.message });
    }
    res.status(httpStatus.success).json({ message: 'Finished' });
  }
}
