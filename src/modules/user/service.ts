import type { FastifyBaseLogger } from "fastify";
import type { CreateUserQuery, CreateUserResponse, UpdateUserQuery } from "./types";
import {
  cacheCreatedUser,
  cacheUpdatedUser,
  getCachedUserById,
  invalidateUserCache,
} from "./cache";
import { createUser, getAllUsers, getUserById, updateUser } from "./repository";

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

export async function updateUserProfile(
  userId: number,
  query: UpdateUserQuery,
  logger?: FastifyBaseLogger,
): Promise<CreateUserResponse | null> {
  const existingUser = await getUserById(userId);

  if (!existingUser) {
    return null;
  }

  const updatedUser = await updateUser(userId, query);

  try {
    await invalidateUserCache(userId);
    await cacheUpdatedUser(updatedUser);
  } catch (error) {
    logger?.warn({ error, userId }, "failed to update user cache");
  }

  return updatedUser;
}
