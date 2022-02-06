import { PrismaClient } from "@prisma/client";
import express from "express";
import { createUser } from "./routes/createUser";
import { getDailyWord } from "./routes/getDailyWord";
import { loginUser } from "./routes/loginUser";
import { solveWord } from "./routes/solveWord";
import dotenv from "dotenv";
import { authToken } from "./jwt";

dotenv.config();
const PORT = process.env.PORT || 3000;

export const prisma = new PrismaClient();

const main = async () => {
  const app = express();

  app.use(express.json());

  app.post("/users", createUser);

  app.post("/login", loginUser);

  app.post("/solve", authToken, solveWord);

  app.get("/daily", authToken, getDailyWord);

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
