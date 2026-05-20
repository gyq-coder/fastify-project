import dotenv from "dotenv";
import path from "node:path";
import Fastify from "fastify";
import type { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";

import userRoute from "@/routes/userRoute";
import testRoute from "@/routes/testRoute";

dotenv.config({
  path: path.resolve(process.cwd(), ".env"),
});

const fastify = Fastify({
  logger: true,
}).withTypeProvider<TypeBoxTypeProvider>();

await fastify.register(import("@fastify/swagger"));

await fastify.register(import("@fastify/swagger-ui"), {
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

fastify.register(userRoute);
fastify.register(testRoute);

// Run the server!
fastify.listen({ port: 3000 }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`Server is now listening on ${address}`);
});
