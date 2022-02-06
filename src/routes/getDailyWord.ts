import { Response } from "express";
import { PrismaClient } from "@prisma/client";

type GetDailyWordResponse = {
  word: string;
};

export const getDailyWord = async (
  res: Response<GetDailyWordResponse>,
  _prisma: PrismaClient
) => {
  return res.json({
    word: "Placeholder",
  });
};
