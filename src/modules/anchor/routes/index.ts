import { authRouter } from './sep10/auth.router';

export function createRoutes(server: any) {
	server.use('/sep10/', authRouter);
}
