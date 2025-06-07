import express from 'express';
import cors from 'cors';
import http from 'http';
import pinoHttp from 'pino-http';
import logger from './logging/logger.js';

/**
 * Creates and configures the Express application and returns the HTTP server.
 */
export async function createServer() {
  const app = express();

  // --- Middleware ---
  // Enable CORS (Cross-Origin Resource Sharing)
  app.use(cors());

  // Enable JSON body parsing for incoming requests
  app.use(express.json());

  // Add pino-http for automatic, structured request logging
  app.use(pinoHttp({ logger }));


  // --- Routes ---
  // A simple health check route to confirm the server is running
  app.get('/', (req, res) => {
    // The request logger (pino-http) will automatically handle logging this request.
    res.status(200).send({ status: 'ok', message: 'Fulcrum API is running' });
  });

  // Future API routes would be added here
  // Example: app.use('/api/v1/users', userRoutes);


  // --- Create HTTP Server ---
  // It's a best practice to create an explicit HTTP server
  // to attach Express to, which is useful for things like WebSockets.
  const server = http.createServer(app);

  return server;
}
