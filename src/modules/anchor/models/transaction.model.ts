import mongoose from "mongoose";

const schema = new mongoose.Schema({
	// userId: { },
	kind: { type: String, required: true, enum: ['deposit', 'withdraw'] },
	asset_code: { type: String, required: true, enum: ['VEST', 'USDC'] },
	account: { type: String, required: true },
	amount: { type: Number },
	on_change_callback: { type: String },

	// for deposit only
	invoiceId: { type: String },

	// for withdraw only
	type: { type: String },
	dest: { type: String },
	dest_extra: { type: String },
},
	{ versionKey: false, timestamps: true }
);

const mongooseModel = mongoose.model("Transaction", schema);

function makeRepository() {
	// TODO: add custom functions here like searchDepositByBankId
	async function create(data: any) {
		return mongooseModel.create(data);
	}

	async function getById(_id: string) {
		return mongooseModel.findById(_id);
	}

	async function _update(_id: string, fields: any) {
		return mongooseModel.findByIdAndUpdate(_id, fields, { new: true });
	}

	async function getMany(filter: any) {
		return mongooseModel.find(filter);
	}

	return { create, getById, _update, getMany };
}

export const TransactionModel = {
	...makeRepository(),
	mongooseModel
};
