import { createUserProfile, getAllUserProfiles, getUserProfileById } from "./service";
import { createUserRouteSchema, getUserByIdRouteSchema } from "./schema";
import type { FastifyTypeBox, GetUserByIdParams } from "./types";

export function userRoutes(fastify: FastifyTypeBox) {
  fastify.post("/create", { schema: createUserRouteSchema }, async (request, reply) => {
    const query = request.body;
    const userProfile = await createUserProfile(query, request.log);

    return reply.send(userProfile);
  });

  fastify.get("/all", async (request, reply) => {
    const users = await getAllUserProfiles();
    return reply.send(users);
  });

  fastify.get<{ Params: GetUserByIdParams }>(
    "/:id",
    { schema: getUserByIdRouteSchema },
    async (request, reply) => {
      const userId = Number(request.params.id);
      const user = await getUserProfileById(userId);

      if (!user) {
        return reply.code(404).send({ message: "User not found" });
      }

      return reply.send(user);
    },
  );
}
