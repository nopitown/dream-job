import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type User = {
  id?: number;
  email: string;
  name: string;
};

export const findUserByEmail = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  prisma.$disconnect();

  return user;
};

export const findOrCreateUser = async (user: User) => {
  const newOrFoundUser = await prisma.user.upsert({
    where: {
      email: user.email,
    },
    update: {},
    create: {
      email: user.email,
      name: user.name,
    },
  });

  prisma.$disconnect();

  return newOrFoundUser;
};
