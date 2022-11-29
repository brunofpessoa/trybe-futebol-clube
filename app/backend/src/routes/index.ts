import { Router } from 'express';
import login from './loginRouter';
import teams from './teamsRouter';
import matches from './matchesRouter';
import leaderboard from './leaderboardRouter';

const router = Router();

router.use('/login', login);
router.use('/teams', teams);
router.use('/matches', matches);
router.use('/leaderboard', leaderboard);

export default router;
