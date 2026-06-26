import redis from "@/libs/ioredis";
import type { CreateUserResponse } from "./types";

const USER_CACHE_PREFIX = "user";
const USER_CACHE_TTL_SECONDS = 60 * 60;

function getUserCacheKey(userId: number) {
  return `${USER_CACHE_PREFIX}:${userId}`;
}

export async function cacheCreatedUser(user: CreateUserResponse) {
  const cacheKey = getUserCacheKey(user.id);
  await redis.set(cacheKey, JSON.stringify(user), "EX", USER_CACHE_TTL_SECONDS);
}

export async function getCachedUserById(userId: number): Promise<CreateUserResponse | null> {
  const cachedUser = await redis.get(getUserCacheKey(userId));

  if (!cachedUser) {
    return null;
  }

  return JSON.parse(cachedUser) as CreateUserResponse;
}

export async function cacheUpdatedUser(user: CreateUserResponse) {
  return cacheCreatedUser(user);
}

export async function invalidateUserCache(userId: number) {
  const cacheKey = getUserCacheKey(userId);
  await redis.del(cacheKey);
}
