import { Networks } from 'stellar-sdk';

const signingKey = process.env.AUTH_SIGNING_KEY;
const signingSecret = process.env.AUTH_SIGNING_SECRET;
const serverPort = Number(process.env.SERVER_PORT || 8080);

if (!signingKey || !signingSecret) {
	throw new Error('Missing signing key or secret');
}

export const config = {
	auth: {
		signingKey,
		signingSecret,
		timeout: 900, // timeout in seconds
		tokenExpiration: '4h' // token expiration in seconds
	},
	serverPort,
	homeDomain: process.env.ANCHOR_HOME_DOMAIN || 'testDomain.com',
	networkPassphrase: process.env.STELLAR_NETWORK === 'PUBLIC' ? Networks.PUBLIC : Networks.TESTNET,
	horizonUrl: process.env.STELLAR_NETWORK === 'PUBLIC' ? 'https://horizon.stellar.org' : 'https://horizon-testnet.stellar.org'
};
