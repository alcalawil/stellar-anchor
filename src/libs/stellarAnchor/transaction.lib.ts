import axios from 'axios';
import { config } from '../../shared/config';
import { IAnchorDeposit, ITransactionLib, IAnchorDepositResponse } from './types.lib';

export function createLib({ anchorUrl }: { anchorUrl?: string } = {}): ITransactionLib {
	const _anchorUrl = anchorUrl || config.anchor.url;
	const cache: any = {};

	async function createDeposit(depositData: IAnchorDeposit, on_change_callback: string): Promise<IAnchorDepositResponse> {
		const { data }: { data: IAnchorDepositResponse } = await axios.get(`${_anchorUrl}/sep06/deposit`, {
			headers: {
				'Authorization': `Bearer ${cache.token}`
			},
			params: { ...depositData, on_change_callback },
		});

		return data;
	}

	return { createDeposit };
}