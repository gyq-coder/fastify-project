import Fastify from "fastify";
import "dotenv/config";
import type { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import { agentModule } from "@/modules/agent";
import { testModule } from "@/modules/test";
import { userModule } from "@/modules/user";

export async function buildApp() {
  const app = Fastify({
    logger: true,
  }).withTypeProvider<TypeBoxTypeProvider>();

  await app.register(import("@fastify/swagger"), {
    openapi: {
      info: {
        title: "API",
        version: "1.0.0",
      },
    },
  });

  await app.register(import("@fastify/swagger-ui"), {
    routePrefix: "/doc",
    uiConfig: {
      docExpansion: "full",
      deepLinking: false,
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
    transformSpecification: (swaggerObject) => swaggerObject,
    transformSpecificationClone: true,
  });

  app.register(userModule, { prefix: "/users" });
  app.register(testModule, { prefix: "/test" });
  app.register(agentModule, { prefix: "/agents" });

  return app;
}
