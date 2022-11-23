import { Router } from 'express';
import login from './loginRouter';

const router = Router();

router.use('/login', login);

export default router;
