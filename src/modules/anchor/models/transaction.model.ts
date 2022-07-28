import mongoose from "mongoose";
import { ITransaction, ITransactionInput, ITransactionModel } from '../../../types';
import { RESOURCE_NOT_FOUND } from '../../../shared/errors';

const MODEL_NAME = 'Transaction';

const schema = new mongoose.Schema<ITransaction>({
	// userId: { },
	kind: { type: String, required: true, enum: ['deposit', 'withdraw'] },
	asset_code: { type: String, required: true, enum: ['VEST', 'USDC'] },
	account: { type: String, required: true },
	amount: { type: Number },
	on_change_callback: { type: String },
	status: { type: String, enum: ['pending', 'confirmed', 'cancelled'] },

	// for deposit only
	invoiceId: { type: String, unique: true, sparse: true },

	// for withdraw only
	type: { type: String },
	dest: { type: String },
	dest_extra: { type: String },
},
	{ versionKey: false, timestamps: true }
);

const mongooseModel = mongoose.model<ITransaction>(MODEL_NAME, schema);

function makeRepository() {
	// TODO: add custom functions here like searchDepositByBankId
	async function create(data: ITransactionInput) {
		return mongooseModel.create(data);
	}

	async function getById(_id: string) {
		const doc = await mongooseModel.findById(_id);

		if (!doc) throw RESOURCE_NOT_FOUND(MODEL_NAME);
		return doc;
	}

	async function _update(_id: string, fields: any) {
		const doc = await mongooseModel.findByIdAndUpdate(_id, fields, { new: true });
		if (!doc) throw RESOURCE_NOT_FOUND(MODEL_NAME);
		return doc;
	}

	async function getMany(filter: any) {
		return await mongooseModel.find(filter);
	}

	return { create, getById, _update, getMany };
}

export const TransactionModel: ITransactionModel = {
	...makeRepository(),
	mongooseModel
};
