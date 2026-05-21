import { runTestFlow } from "./service";
import { testRouteSchema } from "./schema";
import type { FastifyTypeBox } from "./types";

export function testRoutes(fastify: FastifyTypeBox) {
  fastify.get(
    "/test",
    {
      schema: testRouteSchema,
    },
    async (request, reply) => {
      const result = await runTestFlow(request.query);
      return reply.send(result);
    },
  );
}
