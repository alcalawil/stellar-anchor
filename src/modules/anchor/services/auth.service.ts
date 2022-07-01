import { Utils, Keypair, Networks, Server } from 'stellar-sdk';
import { config } from '../../../shared/config';
import jwt from 'jsonwebtoken';

export function createService() {
	const horizonServer = new Server(config.horizonUrl);

	function getChallenge(account: string, memo?: string, homeDomain = config.homeDomain, clientDomain?: string) {
		// TODO: Implement memo authentication
		// TODO: Implement client domain verification

		const keyPair = Keypair.fromSecret(config.auth.signingSecret);

		const transaction = Utils.buildChallengeTx(
			keyPair,
			account,
			homeDomain,
			config.auth.timeout,
			config.networkPassphrase,
			homeDomain,
		);

		return transaction;
	}

	async function verifyChallenge(transaction: string) {
		const { clientAccountID } = Utils.readChallengeTx(
			transaction,
			config.auth.signingKey,
			config.networkPassphrase,
			config.homeDomain,
			config.homeDomain
		);

		try {
			const userAccount = await horizonServer.loadAccount(clientAccountID);

			Utils.verifyChallengeTxThreshold(
				transaction,
				config.auth.signingKey,
				config.networkPassphrase,
				userAccount.thresholds.med_threshold,
				userAccount.signers,
				config.homeDomain,
				config.homeDomain,
			);
		} catch (err: any) {
			if (err.name !== 'NotFoundError') {
				throw { code: 'BAD_SIGNATURE', message: 'Invalid signature' };
			}

			Utils.verifyChallengeTxSigners(
				transaction,
				config.auth.signingKey,
				config.networkPassphrase,
				[clientAccountID],
				config.homeDomain,
				config.homeDomain,
			);
		}

		return clientAccountID;
	}

	function createToken(account: string) {
		const payload = { sub: account };
		return jwt.sign(payload, config.auth.signingSecret, { expiresIn: config.auth.tokenExpiration });
	}

	return { getChallenge, verifyChallenge, createToken };
}
