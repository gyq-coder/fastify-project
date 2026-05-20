import prisma from "@/libs/prisma";
import type { TestQuery, TestResponse } from "./types";

export async function runTestFlow(query: TestQuery): Promise<TestResponse> {
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

  const allUsers = await prisma.user.findMany({
    include: {
      posts: true,
    },
  });

  console.log("All users:", JSON.stringify(allUsers, null, 2));

  return {
    hello: query.name,
    world: query.age,
  };
}
