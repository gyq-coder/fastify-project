import "dotenv/config";
import { buildApp } from "./app";

const app = await buildApp({
  logger:
    process.env.NODE_ENV === "development"
      ? {
          level: "info",
          transport: {
            target: "pino-pretty",
            options: {
              colorize: true,
              translateTime: "HH:MM:ss",
              ignore: "pid,hostname",
            },
          },
        }
      : true,
});

app.listen({ port: 3000 }, function (err) {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
});
