import { Router } from 'express';
import MatchesController from '../controllers/MatchesController';

const router = Router();

router.get('/', (req, res) => MatchesController.getAll(req, res));
router.post('/', (req, res) => MatchesController.insert(req, res));
router.patch('/:id', (req, res) => MatchesController.update(req, res));

export default router;
