import type { FastifyPluginAsync } from "fastify";
import { testRoutes } from "./route";

const testModule: FastifyPluginAsync = async (app) => {
  await app.register(testRoutes);
};

export default testModule;
