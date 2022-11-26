import { Router } from 'express';
import TeamsController from '../controllers/TeamsController';

const router = Router();

router.get('/', (req, res) => TeamsController.getAll(req, res));
router.get('/:id', (req, res) => TeamsController.getOne(req, res));

export default router;
