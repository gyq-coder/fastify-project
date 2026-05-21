import type { FastifyPluginAsync } from "fastify";
import { agentRoutes } from "./route";

const agentModule: FastifyPluginAsync = async (app) => {
  await app.register(agentRoutes);
};

export default agentModule;
