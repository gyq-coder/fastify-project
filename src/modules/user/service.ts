import type { FastifyBaseLogger } from "fastify";
import type { CreateUserQuery, CreateUserResponse } from "./types";
import { cacheCreatedUser, getCachedUserById } from "./cache";
import { createUser, getAllUsers, getUserById } from "./repository";

export async function createUserProfile(
  query: CreateUserQuery,
  logger?: FastifyBaseLogger,
): Promise<CreateUserResponse> {
  const { name, email } = query;
  const user = await createUser(name, email);

  try {
    await cacheCreatedUser(user);
  } catch (error) {
    logger?.warn({ error, userId: user.id }, "failed to cache created user");
  }

  return user;
}

export async function getAllUserProfiles() {
  return getAllUsers();
}

export async function getUserProfileById(userId: number): Promise<CreateUserResponse | null> {
  const cachedUser = await getCachedUserById(userId);

  if (cachedUser) {
    return cachedUser;
  }

  const user = await getUserById(userId);

  if (!user) {
    return null;
  }

  await cacheCreatedUser(user);
  return user;
}
