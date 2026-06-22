import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "@prisma/client";

const adapter = new PrismaMariaDb({
  host: "localhost",
  user: "root",
  password: "admin",
  database: "test",
  connectionLimit: 5,
});

const prisma = new PrismaClient({ adapter });

export default prisma;
