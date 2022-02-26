import { PrismaClient } from "@prisma/client";
import { NewUser, User } from "types/user";

const prisma = new PrismaClient();

export const findUserByEmail = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  prisma.$disconnect();

  return user;
};

export const findOrCreateUser = async (user: NewUser) => {
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
