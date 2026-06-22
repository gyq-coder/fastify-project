import { generateAgentMessage } from "./service";
import { agentRouteSchema } from "./schema";
import type { FastifyTypeBox } from "./types";

export function agentRoutes(fastify: FastifyTypeBox) {
  fastify.get(
    "/agent",
    {
      schema: agentRouteSchema,
    },
    async (request, reply) => {
      const response = await generateAgentMessage("先杭州天气然后再苏州天气,最后总结一下");
      console.log("Agent response:", response.messages.at(-1)?.content.content);

      return reply.send({ name: request.query.name, age: request.query.age });
    },
  );
}
