import { PrismaClient } from "@prisma/client";
import express from "express";

const PORT = process.env.PORT || 3000;
const prisma = new PrismaClient();

const main = async () => {
  const app = express();

  app.get("/", async (_req, res) => {
    res.json({
      hello: "world",
    });
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
