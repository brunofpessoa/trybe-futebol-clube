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

    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = req.body;

    if (!homeTeam || !awayTeam || !homeTeamGoals || !awayTeamGoals) {
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
}
