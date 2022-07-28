import axios from 'axios';
import { ITransaction, ITransactionInput, ITransactionModel } from '../../../types';

export function createService({ TransactionModel, bankService }: { TransactionModel: ITransactionModel, bankService: any }) {
	async function create({ asset_code, account, amount, on_change_callback }: ITransactionInput) {
		// has trustline?
		// const trustline = await getTrustline(asset_code, account);
		// if (!trustline) throw new Error('No trustline');

		// is user kycd?
		// const user = await userService.getUserFromAccount(account);
		// if (!user.kycDone) throw new Error('User is not kycd');

		// check user limits


		// TODO::Improvement: wrap into a db transaction
		// For fiat anchored assets only
		const invoice = await bankService.createInvoice();
		// create transaction
		const transaction = await TransactionModel.create({
			kind: 'deposit',
			asset_code,
			account,
			amount,
			invoiceId: invoice._id,
			on_change_callback
			// TODO: ...
		});

		// transaction.kind
		return transaction;
	}

	async function confirmPaymentReceived(invoiceId: string) {
		// search deposit by invoice id
		const transaction = (await TransactionModel.getMany({ invoiceId }))[0];
		if (!transaction) throw new Error('Transaction not found');

		// // update transaction
		const updatedTx = await TransactionModel._update(transaction._id, { status: 'confirmed' });

		// // if webHook is set, call it
		if (transaction.on_change_callback) {
			await callWebHook(transaction.on_change_callback, transaction);
		}
	}

	async function callWebHook(url: string, transaction: ITransaction) {
		console.debug('------- A ------ callWebHook', url);

		// TODO: This data should be consistent with the returned by GET /Transaction

		// call webHook
		const data = {
			id: transaction._id,
			kind: transaction.kind,
			asset_code: transaction.asset_code,
			account: transaction.account,
			amount: transaction.amount,
			status: transaction.status,
		};

		axios.post(url, data) // TODO:: Improvement: Add X-Signature header so that the webhook can be verified
			.then(({ data }) => console.debug(`webhook data for deposit ${transaction._id} confirmed`, data))
			.catch(e => console.error(`callWebHook error: id: transaction._id`, e.message));
	}

	return { create, confirmPaymentReceived };
}
