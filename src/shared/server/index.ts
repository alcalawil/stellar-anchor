import express from "express";
import cors from 'cors';
import { config } from '../config';

const server = express();

export function setupServer() {
	server.use(cors({ origin: '*' }));
	server.use(express.json());
	// server.use(checkApiKey); // uncomment if you need api keys
	server.get("/", function (req, res) {
		res.send("Hello World");
	});

	return server;
}

export function startServer(port = config.serverPort) {
	// start server
	server.listen(port);
	console.log(`listening on port ${port}`);
}
