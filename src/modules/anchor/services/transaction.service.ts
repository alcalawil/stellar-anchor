import axios from 'axios';
import { ITransactionModel } from '../../../types';

export function createService({ TransactionModel }: { TransactionModel: ITransactionModel }) {
	async function getFormattedTransaction(id: string) {
		const transaction = await TransactionModel.getById(id);
		const { _id, kind, status, invoiceId, on_change_callback } = transaction;

		return {
			id: _id,
			kind,
			status,
			status_eta: 3600,
			external_transaction_id: invoiceId,
			amount_in: "18.34",
			amount_out: "18.24",
			amount_fee: "0.1",
			started_at: "2017-03-20T17:05:32Z",
			on_change_callback
		}
	}


	return { getFormattedTransaction };
}
