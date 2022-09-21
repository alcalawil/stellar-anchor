import { createLib as createAuthLib } from './auth.lib';
import { createLib as createTransactionLib } from './transaction.lib';
import { IAuthLib, ITransactionLib } from './types.lib';

export const authLib: IAuthLib = createAuthLib();
export const transactionLib: ITransactionLib = createTransactionLib();

export const anchorLib = {
	auth: authLib,
	transaction: transactionLib
}

export * from './types.lib';
