import { createService as createAuthService } from './auth.service';
import { createService as createBankService } from './bank.service';
import { createService as createDepositService } from './deposit.service';
import { TransactionModel } from '../models';

export const authService = createAuthService();
export const bankService = createBankService();
export const depositService = createDepositService({ TransactionModel, bankService });
