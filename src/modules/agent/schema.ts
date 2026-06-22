import { Type } from "typebox";

export const agentQuerySchema = Type.Object({
  name: Type.String(),
  age: Type.Number(),
});

export const agentResponseSchema = Type.Object({
  name: Type.String(),
  age: Type.Number(),
});

export const agentRouteSchema = {
  querystring: agentQuerySchema,
  response: {
    200: agentResponseSchema,
  },
};
