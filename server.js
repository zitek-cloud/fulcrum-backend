"use strict";

import config from "config";
import app from "./src/app.js";

const closeListeners = (server, logger) => {
  logger.info("Received signal to close server");
  server.close(() => {
    logger.info("🏁 Server closed");
    process.exit(0);
  });
};

const start = async (server) => {
  try {
    server.log.info("🎬 Server starting");

    // Start listening on the configured host and port
    await server.listen({
      port: config.get("server.port"),
      host: config.get("server.host"),
    });

    // Set up graceful shutdown listeners
    process.on("SIGINT", () => closeListeners(server, server.log)); // Catches Ctrl+C
    process.on("SIGTERM", () => closeListeners(server, server.log)); // Catches kill commands
    server.log.info("👂 Server startup complete");
  } catch (err) {
    console.error("Error starting the server:", err);
    process.exit(1);
  }
};

start(app);
