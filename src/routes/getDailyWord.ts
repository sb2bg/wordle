import { Request, Response } from "express";
import { prisma } from "../main";

type GetDailyWordResponse = {
  word: string;
};

export const getDailyWord = async (
  _req: Request,
  res: Response<GetDailyWordResponse>
) => {
  // FIXME: get daily word from database instead of the first one
  const word = await prisma.word.findUnique({
    where: {
      id: 1,
    },
  });

  if (!word) {
    return res.status(400).json({
      word: "lol",
    });
  }

  return res.json({
    word: word.word,
  });
};
