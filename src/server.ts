import { buildApp } from "./app";

const app = await buildApp();

app.listen({ port: 3000 }, function (err, address) {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  app.log.info(`Server is now listening on ${address}`);
});
