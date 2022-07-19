
export function createService({ TransactionModel, bankService }: { TransactionModel: any, bankService: any }) {
	async function create(asset_code: string, account: string, amount: number) {
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
			// TODO: ...
		});

		return transaction;
	}

	return { create };
}
