import { Router } from 'express';
import login from './loginRouter';
import teams from './teamsRouter';

const router = Router();

router.use('/login', login);
router.use('/teams', teams);

export default router;
