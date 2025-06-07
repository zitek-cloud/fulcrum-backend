import config from 'config';
import { createServer } from './server.js';
import logger from './logging/logger.js';
// To add later: import { connectDB } from './database.js';

async function main() {
  logger.info('Starting Fulcrum application...');

  // Get server configuration
  const port = config.get('server.port');
  const host = config.get('server.host');
  
  // To add later: await connectDB();

  // Create the Express server
  const server = await createServer();

  // Start listening for incoming requests
  server.listen(port, host, () => {
    logger.info({ port, host }, `🚀 Server is listening at http://${host}:${port}`);
  });
}

main();
