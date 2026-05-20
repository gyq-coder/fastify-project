import type {
  FastifyInstance,
  FastifyBaseLogger,
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
} from "fastify";
import type { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import { Type } from "typebox";

type FastifyTypeBox = FastifyInstance<
  RawServerDefault,
  RawRequestDefaultExpression<RawServerDefault>,
  RawReplyDefaultExpression<RawServerDefault>,
  FastifyBaseLogger,
  TypeBoxTypeProvider
>;

function userRoute(fastify: FastifyTypeBox) {
  fastify.addHook("onRequest", async (request, reply) => {
    console.log("Received request:", {
      method: request.method,
      url: request.url,
      headers: request.headers,
    });
  });

  fastify.get(
    "/users",
    {
      schema: {
        querystring: Type.Object({
          name: Type.String(),
          age: Type.Number(),
        }),
        response: {
          200: Type.Object({
            name: Type.String(),
            age: Type.Number(),
          }),
        },
      },
    },
    async (request, reply) => {
      return reply.send({ name: request.query.name, age: request.query.age });
    },
  );
}

export default userRoute;
