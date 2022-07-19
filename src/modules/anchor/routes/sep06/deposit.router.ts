import { Router } from 'express';
import { deposit } from '../../controllers/deposit.controller';

export const router = Router();

router.get('/deposit', deposit);

export { router as depositRouter };
