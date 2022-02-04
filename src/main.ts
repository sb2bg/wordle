import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {};

main()
  .catch((err) => {
    console.error(err);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
