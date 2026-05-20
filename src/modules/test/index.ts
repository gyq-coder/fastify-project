import type { FastifyPluginAsync } from "fastify";
import { testRoutes } from "./route";

export const testModule: FastifyPluginAsync = async (app) => {
  await app.register(testRoutes);
};

export default testModule;
export { testRoutes };
