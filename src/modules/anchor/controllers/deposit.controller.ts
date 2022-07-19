import { Request as Req, Response as Res } from 'express';
import { depositService } from '../services';
import { BadRequestError } from '../../../shared/server/errors';
import { defaultCatcher } from '../../../shared/server/server.utils';

export async function deposit(req: Req, res: Res) {
	try {
		/** TODO: Implement remaining query parameters. See docs 
		 * @link https://github.com/stellar/stellar-protocol/blob/master/ecosystem/sep-0006.md#transaction-history 
		 */
		const { asset_code, account, amount, } = req.query;

		if (typeof asset_code !== 'string' || typeof account !== 'string' || typeof amount !== 'string') throw BadRequestError(JSON.stringify(req.query));

		const { _id, paymentMethod, fee } = await depositService.create(asset_code, account, Number(amount));

		// TODO: find a way to parse the paymentMethod
		res.status(201).json({
			id: _id,
			how: paymentMethod,
			fee_fixed: fee
		});
	} catch (e) {
		defaultCatcher(e, res);
	}
}
