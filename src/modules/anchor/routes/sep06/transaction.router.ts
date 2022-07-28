import { Router } from 'express';
import { getTransaction } from '../../controllers/transaction.controller';

export const router = Router();

router.get('/transaction', getTransaction);

export { router as transactionRouter };
