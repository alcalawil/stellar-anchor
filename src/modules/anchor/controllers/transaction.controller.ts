import { Request as Req, Response as Res } from 'express';
import { transactionService } from '../services';
import { defaultCatcher } from '../../../shared/server/server.utils';
import { BadRequestError } from '../../../shared/server/errors';

export async function getTransaction(req: Req, res: Res) {
	try {
		const { id } = req.query;

		if (typeof id !== 'string') throw BadRequestError('Invalid transaction id');

		const transaction = await transactionService.getFormattedTransaction(id);
		res.status(201).json(transaction);
	} catch (e) {
		defaultCatcher(e, res);
	}
}
