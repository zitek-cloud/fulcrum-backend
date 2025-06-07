// src/routes/health.js

/**
 * Fastify plugin for /health endpoint
 * @param {import('fastify').FastifyInstance} fastify
 * @param {object} opts
 */
export default async function healthRoute(fastify, opts) {
  fastify.get(
    "/health",
    {
      schema: {
        description: "Health check endpoint",
        tags: ["Health"],
        summary: "Health check",
        response: {
          200: {
            description: "Service is healthy",
            type: "object",
            properties: {
              status: { type: "string" },
              uptime: { type: "number" },
              timestamp: { type: "string", format: "date-time" },
            },
          },
        },
      },
    },
    async (request, reply) => {
      return {
        status: "ok",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
      };
    }
  );
}
