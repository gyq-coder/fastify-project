import { buildUserProfile } from "./service";
import { createUserRouteSchema } from "./schema";
import type { FastifyTypeBox } from "./types";

function userRoutes(fastify: FastifyTypeBox) {
  fastify.addHook("onRequest", async (request) => {
    console.log("Received request:", {
      method: request.method,
      url: request.url,
      headers: request.headers,
    });
  });

  fastify.get(
    "/create",
    {
      schema: createUserRouteSchema,
    },
    async (request, reply) => {
      const userProfile = buildUserProfile(request.query);
      return reply.send(userProfile);
    },
  );
}

export { userRoutes };
export default userRoutes;
