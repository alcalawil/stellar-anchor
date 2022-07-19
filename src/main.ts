import { setupServer, startServer } from './shared/server';
import { makeAnchorModule } from './modules';
import { startDb } from './shared/db';

async function main() {
  try {
    const server = setupServer();

    // instance modules
    makeAnchorModule(server);

    await startDb();
    startServer();
  } catch (err) {
    console.log(err);
  }
}

main();
