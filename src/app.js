"use strict";

import Fastify from "fastify";
import config from "config";

// Import your plugins
// import dbPlugin from './plugins/db.js'
// import authPlugin from './plugins/auth.js'

// Import your routes
import rootRoute from "./routes/root.js";
import healthRoute from "./routes/health.js";

import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
// import userRoutes from './routes/api/users/index.js'
// import productRoutes from './routes/api/products/index.js'

// Instantiate Fastify
const app = Fastify({
  // Configure the logger

  logger: {
    redact: config.get("logging.redact"),
    transport: {
      targets: [
        {
          target: "pino-pretty",
          level: "trace",
          options: {
            colorize: true,
            translateTime: "SYS:standard",
          },
        },
        {
          target: "pino-pretty",
          level: "trace",
          options: {
            destination: "logs/fulcrum-rho-pretty.log",
            colorize: false,
            translateTime: "SYS:standard",
          },
        },
        {
          target: "pino/file",
          level: "trace",
          options: {
            destination: "logs/fulcrum-rho-json.log",
            mkdir: true,
          },
        },
      ],
    },
  },
});

// --- REGISTRATION ---
// The order of registration is important!

// 1. Register shared plugins first
// These add functionality (decorators, hooks) that routes will use.
// app.register(dbPlugin)
// app.register(authPlugin)

// Register Swagger docs plugin in root context
app.register(fastifySwagger, {
  openapi: {
    info: {
      title: "Fulcrum API",
      description: "API documentation for Fulcrum backend",
      version: "1.0.0",
    },
    servers: [
      {
        url: `http://localhost:${config.get("server.port")}`,
      },
    ],
  },
});

app.register(fastifySwaggerUi, {
  routePrefix: "/api-docs",
  uiConfig: {
    docExpansion: "list",
    deepLinking: false,
  },
});

// 2. Register routes
// These will consume the functionality provided by the plugins above.
app.register(healthRoute);
app.register(rootRoute);
// app.register(userRoutes, { prefix: '/api/v1/users' })
// app.register(productRoutes, { prefix: '/api/v1/products' })

// Export the configured app instance to be used by server.js
export default app;
