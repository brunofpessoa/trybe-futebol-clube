import { Router } from 'express';
import login from './loginRouter';
import teams from './teamsRouter';
import matches from './matchesRouter';

const router = Router();

router.use('/login', login);
router.use('/teams', teams);
router.use('/matches', matches);

export default router;
