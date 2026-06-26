import Fastify from "fastify";
import type { FastifyServerOptions } from "fastify";
import type { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import formbody from "@fastify/formbody";
import multipart from "@fastify/multipart";
import helmet from "@fastify/helmet";
import userModule from "@/modules/user";

export async function buildApp(options: FastifyServerOptions = {}) {
  const app = Fastify(options).withTypeProvider<TypeBoxTypeProvider>();

  await app.register(swagger);

  await app.register(swaggerUi);

  await app.register(helmet);

  await app.register(formbody);

  await app.register(multipart);

  await app.register(userModule, { prefix: "/users" });

  return app;
}
