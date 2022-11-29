import { Router } from 'express';
import LeaderboardController from '../controllers/leaderboardController';

const router = Router();

router.get('/home', (req, res) => LeaderboardController.getHomeLeaderboard(req, res));
router.get('/away', (req, res) => LeaderboardController.getAwayLeaderboard(req, res));

export default router;
