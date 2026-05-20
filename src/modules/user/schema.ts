import { Type } from "typebox";

export const createUserQuerySchema = Type.Object({
  name: Type.String({
    description: "用户名",
  }),
  age: Type.Number({
    description: "年龄",
  }),
});

export const createUserResponseSchema = Type.Object({
  name: Type.String({
    description: "用户名",
  }),
  age: Type.Number({
    description: "年龄",
  }),
  sex: Type.String({
    description: "性别",
  }),
});

export const createUserRouteSchema = {
  querystring: createUserQuerySchema,
  response: {
    200: createUserResponseSchema,
  },
};
