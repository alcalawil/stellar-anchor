import { Router } from 'express';
import { getChallenge, verifyChallenge } from '../../controllers/auth.controller';

export const router = Router();

router.get('/auth', getChallenge);
router.post('/auth', verifyChallenge);

export { router as authRouter };
