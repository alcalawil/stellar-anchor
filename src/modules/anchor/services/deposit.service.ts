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
		await TransactionModel._update(transaction._id, { status: 'confirmed' });

		// // if webHook is set, call it
		if (transaction.on_change_callback) {
			await callWebHook(transaction.on_change_callback, transaction);
		}
	}

	async function callWebHook(url: string, transaction: ITransaction) {
		// call webHook
		const data = {
			kind: transaction.kind,
			asset_code: transaction.asset_code,
			account: transaction.account,
			amount: transaction.amount,
			status: transaction.status,
		};
		await axios.post(url, data).catch(e => console.error('callWebHook error:', e));
	}

	return { create, confirmPaymentReceived };
}
