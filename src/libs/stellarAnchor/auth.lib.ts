import axios from 'axios';
import StellarSdk from 'stellar-sdk';
import { config } from '../../shared/config';
import { IAuthLib } from './types.lib';

export function createLib({ anchorUrl }: { anchorUrl?: string } = {}): IAuthLib {
	const _anchorUrl = anchorUrl || config.anchor.url;
	const cache: any = {};

	async function getToken(account: string, secret: string): Promise<string> {
		if (cache[account]) return cache[account];
		// TODO: Add redis cache or something and logic for getting, setting and expiring tokens

		return auth(account, secret);
	}

	async function auth(account: string, secret: string): Promise<string> {
		const transaction = await getChallengeTx(account);
		const signedTransaction = signTransaction(transaction, secret);
		const token = await postChallenge(signedTransaction);

		return token;
	}

	async function getChallengeTx(account: string) {
		const { data } = await axios.get(`${_anchorUrl}/auth?account=${account}`);
		return data.transaction;
	}

	function signTransaction(transaction: string, secret: string) {
		const newTx = StellarSdk.TransactionBuilder.fromXDR(transaction, config.anchor.networkPassphrase);
		newTx.sign(StellarSdk.Keypair.fromSecret(secret));
		return newTx.toEnvelope().toXDR("base64");
	}

	async function postChallenge(transaction: string) {
		const { data } = await axios.post(`${_anchorUrl}/auth`, { transaction });
		return data.token;
	}

	return { getToken };
}