import { Router } from 'express';
import { withdraw } from '../../controllers/withdraw.controller';

export const router = Router();

router.get('/withdraw', withdraw);

export { router as withdrawRouter };
