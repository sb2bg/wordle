import { PrismaClient } from "@prisma/client";
import express from "express";
import { createUser } from "./routes/createUser";
import { getDailyWord } from "./routes/getDailyWord";
import { loginUser } from "./routes/loginUser";
import { solveWord } from "./routes/solveWord";
import dotenv from "dotenv";

dotenv.config();
const PORT = process.env.PORT || 3000;
const prisma = new PrismaClient();

const main = async () => {
  const app = express();

  app.use(express.json());

  app.post("/users", async (req, res) => {
    await createUser(req, res, prisma);
  });

  app.post("/login", async (req, res) => {
    await loginUser(req, res, prisma);
  });

  app.post("/solve", async (req, res) => {
    await solveWord(req, res, prisma);
  });

  app.get("/daily", async (_req, res) => {
    await getDailyWord(res, prisma);
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
