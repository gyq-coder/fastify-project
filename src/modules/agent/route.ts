import { generateAgentMessage } from "./service";
import { agentRouteSchema } from "./schema";
import type { FastifyTypeBox } from "./types";

function agentRoutes(fastify: FastifyTypeBox) {
  fastify.get(
    "/agent",
    {
      schema: agentRouteSchema,
    },
    async (request, reply) => {
      const response = await generateAgentMessage("Hello!");
      console.log("Agent response:", response);

      return reply.send({ name: request.query.name, age: request.query.age });
    },
  );
}

export { agentRoutes };
export default agentRoutes;
