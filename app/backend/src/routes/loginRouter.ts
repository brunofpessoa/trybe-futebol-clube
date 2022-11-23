import { Router } from 'express';
import LoginController from '../controllers/LoginController';

const router = Router();

router.post('/', (req, res) => LoginController.login(req, res));

export default router;
