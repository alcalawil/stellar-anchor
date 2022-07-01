import { createRoutes } from './routes';

export function makeModule(server: any) {
	createRoutes(server);
}