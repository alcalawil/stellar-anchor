import { Request as Req, Response as Res } from 'express';
import { defaultCatcher } from '../../../shared/server/server.utils';
import { config } from '../../../shared/config';
import { authService } from '../services';

export async function getChallenge(req: Req, res: Res) {
	try {
		const { account, memo, home_domain, client_domain } = req.query;
		if (typeof (account) !== 'string') return res.status(400).send('Invalid account');

		// TODO: Implement memo, home_domain, client_domain
		const challenge = authService.getChallenge(account);

		return res.status(200).json({ transaction: challenge, network_passphrase: config.networkPassphrase });
	} catch (e: any) {
		defaultCatcher(e, res);
	}
}

export async function verifyChallenge(req: Req, res: Res) {
	try {
		const { transaction } = req.body;
		const account = await authService.verifyChallenge(transaction);
		const token = await authService.createToken(account);

		// TODO: Create jwt token
		return res.status(201).json({ token });
	} catch (e: any) {
		if (e.name === 'InvalidSep10ChallengeError') return res.status(400).json({ error: e.message });
		defaultCatcher(e, res);
	}
}
