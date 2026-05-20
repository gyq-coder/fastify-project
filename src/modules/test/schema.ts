import { Type } from "typebox";

export const testQuerySchema = Type.Object({
  name: Type.String(),
  age: Type.Number(),
});

export const testResponseSchema = Type.Object({
  hello: Type.String(),
  world: Type.Number(),
});

export const testRouteSchema = {
  querystring: testQuerySchema,
  response: {
    200: testResponseSchema,
  },
};
