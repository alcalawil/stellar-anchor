import { authRouter } from './sep10/auth.router';
import { depositRouter } from './sep06/deposit.router';
import { withdrawRouter } from './sep06/withdraw.router';
import { transactionRouter } from './sep06/transaction.router';

export function createRoutes(server: any) {
	server.use('/sep10/', authRouter);
	server.use('/sep06/', depositRouter);
	server.use('/sep06/', withdrawRouter);
	server.use('/sep06/', transactionRouter);
}
