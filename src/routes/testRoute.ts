import type {
  FastifyInstance,
  FastifyBaseLogger,
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
} from "fastify";
import type { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import { Type } from "typebox";
import prisma from "@/lib/prisma";

type FastifyTypeBox = FastifyInstance<
  RawServerDefault,
  RawRequestDefaultExpression<RawServerDefault>,
  RawReplyDefaultExpression<RawServerDefault>,
  FastifyBaseLogger,
  TypeBoxTypeProvider
>;

function testRoute(fastify: FastifyTypeBox) {
  fastify.get(
    "/test",
    {
      schema: {
        querystring: Type.Object({
          name: Type.String(),
          age: Type.Number(),
        }),
      },
    },
    async function (request, reply) {
      const user = await prisma.user.create({
        data: {
          name: "Alice",
          email: "alice@prisma.io",
          posts: {
            create: {
              title: "Hello World",
              content: "This is my first post!",
              published: true,
            },
          },
        },
        include: {
          posts: true,
        },
      });
      console.log("Created user:", user);
      // Fetch all users with their posts
      const allUsers = await prisma.user.findMany({
        include: {
          posts: true,
        },
      });
      console.log("All users:", JSON.stringify(allUsers, null, 2));
      return reply.send({ hello: request.query.name, world: request.query.age });
    },
  );
}

export default testRoute;
