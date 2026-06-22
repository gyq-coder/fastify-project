import Redis from "ioredis";

// 创建 ioredis 客户端
const redis = new Redis({
  port: 6379,
  host: "localhost",
  username: "default",
  password: "admin",
});

export default redis;
