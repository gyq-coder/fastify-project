import Redis from "ioredis";

const redis = new Redis({
  host: "localhost",
  port: 6379,
  username: "default",
  password: "admin",
});

export default redis;
