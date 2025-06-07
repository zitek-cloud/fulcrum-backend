import "./instrument.js"; // Import the instrumentation module first to ensure it runs before anything else

import config from "config";
import express from "express";
import cors from "cors";
import http from "http";
import pinoHttp from "pino-http";
import * as Sentry from "@sentry/node";
import logger from "./logging/logger.js";
// To add later: import { connectDB } from './database.js';

async function main() {
  logger.info("Starting Fulcrum application...");

  // Get server configuration
  const port = config.get("server.port");
  const host = config.get("server.host");

  // To add later: await connectDB();

  // Create the Express server and get both app and server instances
  const app = express();

  // --- Routes ---
  app.get("/", (req, res) => {
    res.status(200).send({ status: "ok", message: "Fulcrum API is running" });
  });

  // This is a test route to verify Sentry is working.
  app.get("/debug-sentry", (req, res) => {
    throw new Error("My first Sentry error!");
  });

  // The error handler must be registered before any other error middleware and after all controllers
  Sentry.setupExpressErrorHandler(app);

  // --- Middleware ---

  app.use(cors());
  app.use(express.json());
  app.use(pinoHttp({ logger }));

  // Optional fallthrough error handler
  app.use(function onError(err, req, res, next) {
    // The error id is attached to `res.sentry` to be returned
    // and optionally displayed to the user for support.
    res.statusCode = 500;
    res.end(res.sentry + "\n");
  });

  const server = http.createServer(app);

  // Start listening for incoming requests
  server.listen(port, host, () => {
    logger.info(
      { port, host },
      `Server is listening at http://${host}:${port}`
    );
  });
}

main();
