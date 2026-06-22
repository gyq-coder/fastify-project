import { Type } from "typebox";

export const createUserQuerySchema = Type.Object({
  name: Type.String({
    description: "用户名",
  }),
  email: Type.String({
    description: "邮箱",
  }),
});

export const userResponseSchema = Type.Object({
  id: Type.Number({
    description: "用户 ID",
  }),
  name: Type.String({
    description: "用户名",
  }),
  email: Type.String({
    description: "邮箱",
  }),
});

export const getUserByIdParamsSchema = Type.Object({
  id: Type.String({
    description: "用户 ID",
    pattern: "^[0-9]+$",
  }),
});

export const notFoundResponseSchema = Type.Object({
  message: Type.String(),
});

export const createUserRouteSchema = {
  body: createUserQuerySchema,
  response: {
    200: userResponseSchema,
  },
};

export const getUserByIdRouteSchema = {
  params: getUserByIdParamsSchema,
  response: {
    200: userResponseSchema,
    404: notFoundResponseSchema,
  },
};
