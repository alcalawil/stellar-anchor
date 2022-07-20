import { Model, Document } from 'mongoose';

/**
 * @param I: Input type, for params
 * @param T: Output type, for response
 */
export interface IModel<I, T> {
	mongooseModel: Model<T>;
	create(data: I): Promise<Document<any, any, T>>;
	getById(_id: string): Promise<T>;
	_update: (id: string, data: I) => Promise<T>;
	getMany(filter: I): Promise<T[]>;
}

export interface ITransaction {
	_id: string;
	kind: string;
	asset_code: string;
	account: string;
	amount: number;
	on_change_callback?: string;
	status: string;
	// deposit only
	invoiceId?: string;
	// withdraw only
	type?: string;
	dest?: string;
	dest_extra?: string;
}

export interface ITransactionInput {
	kind?: ITransaction['kind'];
	asset_code?: ITransaction['asset_code'];
	account?: ITransaction['account'];
	amount?: ITransaction['amount'];
	on_change_callback?: ITransaction['on_change_callback'];
	invoiceId?: ITransaction['invoiceId'];
	status?: ITransaction['status'];
}

export interface ITransactionModel extends IModel<ITransactionInput, ITransaction> { }
