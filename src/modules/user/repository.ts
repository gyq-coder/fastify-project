import prisma from "@/libs/prisma";

export async function createUser(name: string, email: string) {
  const user = await prisma.user.create({
    data: {
      name,
      email,
    },
  });

  return user;
}

export async function getAllUsers() {
  const users = await prisma.user.findMany();
  return users;
}

export async function getUserById(id: number) {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  return user;
}

export async function updateUser(id: number, data: { name?: string; email?: string }) {
  const user = await prisma.user.update({
    where: {
      id,
    },
    data,
  });

  return user;
}
