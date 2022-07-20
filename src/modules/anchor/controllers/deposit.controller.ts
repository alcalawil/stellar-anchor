import { Request as Req, Response as Res } from 'express';
import { depositService } from '../services';
import { BadRequestError } from '../../../shared/server/errors';
import { defaultCatcher } from '../../../shared/server/server.utils';
import { ITransactionInput } from '../../../types';

export async function deposit(req: Req, res: Res) {
	try {
		/** TODO: Implement remaining query parameters. See docs 
		 * @link https://github.com/stellar/stellar-protocol/blob/master/ecosystem/sep-0006.md#transaction-history 
		 */
		const { asset_code, account, amount, on_change_callback }: ITransactionInput = req.query;
		if (typeof asset_code !== 'string' || typeof account !== 'string' || typeof amount !== 'string') throw BadRequestError(JSON.stringify(req.query));

		const { _id } = await depositService.create({ asset_code, account, amount: Number(amount), on_change_callback });

		// TODO: find a way to parse the paymentMethod
		res.status(201).json({
			id: _id,
			how: 'deposit to this bank account xxx123abc',
			fee_fixed: '0.0000',
		});
	} catch (e) {
		defaultCatcher(e, res);
	}
}

export async function confirmPaymentReceived(req: Req, res: Res) {
	try {
		const { invoiceId } = req.body;
		if (typeof invoiceId !== 'string') throw BadRequestError('bad body param invoiceId');

		await depositService.confirmPaymentReceived(invoiceId);
		res.status(201).json({ message: 'Accepted' });
	} catch (e) {
		defaultCatcher(e, res);
	}
}