import { Router } from 'express';
import LoginController from '../controllers/LoginController';

const router = Router();

router.post('/', (req, res) => LoginController.login(req, res));
router.get('/validate', (req, res) => LoginController.validate(req, res));

export default router;
