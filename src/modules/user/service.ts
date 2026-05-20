import type { CreateUserQuery, CreateUserResponse } from "./types";

export function buildUserProfile(query: CreateUserQuery): CreateUserResponse {
  return {
    name: query.name,
    age: query.age,
    sex: "男",
  };
}
