import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';
import httpStatus from '../helpers/httpStatus';

export default class LeaderboardController {
  static async getHomeLeaderboard(_req: Request, res: Response) {
    const data = await LeaderboardService.getHomeLeaderboard();

    res.status(httpStatus.success).json(data);
  }

  static async getAwayLeaderboard(_req: Request, res: Response) {
    const data = await LeaderboardService.getAwayLeaderboard();

    res.status(httpStatus.success).json(data);
  }
}
