import { PrismaClient } from "@prisma/client";
import express from "express";

const prisma = new PrismaClient();

const main = async () => {
  const app = express();

  app.get("/", async (_req, res) => {
    res.json({
      hello: "world",
    });
  });
};

main()
  .catch((err) => {
    console.error(err);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
