import { PrismaClient } from "@prisma/client";
import express from "express";
import { createUser } from "./createUser";

const PORT = process.env.PORT || 3000;
const prisma = new PrismaClient();

const main = async () => {
  const app = express();

  app.use(express.json());

  app.post("/users", async (req, res) => {
    await createUser(req, res, prisma);
  });

  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
};

main()
  .catch((err) => {
    console.error(err);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
