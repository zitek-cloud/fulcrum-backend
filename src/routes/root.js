// src/routes/root.js

/**
 * @swagger
 * /:
 *   get:
 *     summary: Root endpoint
 *     description: Returns API status and timestamp
 *     responses:
 *       200:
 *         description: API is running
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *                 timestamp:
 *                   type: string
 */

/**
 * Fastify plugin for root endpoint
 * @param {import('fastify').FastifyInstance} fastify
 * @param {object} opts
 */
export default async function rootRoute(fastify, opts) {
  fastify.get(
    "/",
    {
      schema: {
        description: "Returns API status and timestamp",
        tags: ["Root"],
        summary: "Root endpoint",
        response: {
          200: {
            description: "API is running",
            type: "object",
            properties: {
              status: { type: "string" },
              message: { type: "string" },
              timestamp: { type: "string", format: "date-time" },
            },
          },
        },
      },
    },
    async (request, reply) => {
      return {
        status: "ok",
        message: "Fulcrum API is running",
        timestamp: new Date().toISOString(),
      };
    }
  );
}
