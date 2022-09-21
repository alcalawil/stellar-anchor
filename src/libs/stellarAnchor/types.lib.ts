export interface IAuthLib {
	getToken(account: string, secret: string): Promise<string>;
}

export interface ITransactionLib {
	createDeposit: (depositData: IAnchorDeposit, on_change_callback: string) => Promise<IAnchorDepositResponse>;
}

export interface IAnchor {
	auth: IAuthLib;
	transaction: ITransactionLib;
}

export interface IAnchorDeposit {
	asset_code: string;
	account: string;
	amount: string;
}
export interface IAnchorDepositResponse {
	id: string;
	eta: number;
	how: string;
}
