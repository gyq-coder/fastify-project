import type { FastifyPluginAsync } from "fastify";
import { userRoutes } from "./route";

const userModule: FastifyPluginAsync = async (app) => {
  await app.register(userRoutes);
};

export default userModule;
