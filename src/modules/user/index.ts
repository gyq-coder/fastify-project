import type { FastifyPluginAsync } from "fastify";
import { userRoutes } from "./route";

export const userModule: FastifyPluginAsync = async (app) => {
  await app.register(userRoutes);
};

export default userModule;
export { userRoutes };
