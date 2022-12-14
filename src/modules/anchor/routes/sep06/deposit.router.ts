import { Router } from 'express';
import { deposit, confirmPaymentReceived } from '../../controllers/deposit.controller';

export const router = Router();

router.get('/deposit', deposit);
router.post('/deposit/paid', confirmPaymentReceived);

export { router as depositRouter };
