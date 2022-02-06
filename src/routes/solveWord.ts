import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

type SolveWordResponse = {
  success: boolean;
  message?: string;
};

export const solveWord = async (
  req: Request,
  res: Response<SolveWordResponse>,
  prisma: PrismaClient
) => {
  const { userId, wordId } = req.body;

  if (!userId || !wordId) {
    return res.status(400).json({
      success: false,
      message: "Fields userID and wordId are required",
    });
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    return res.status(400).json({
      success: false,
      message: `Couldn't find user with id ${userId}`,
    });
  }

  const word = await prisma.word.findUnique({
    where: { id: wordId },
  });

  if (!word) {
    return res.status(400).json({
      success: false,
      message: `Couldn't find word with id ${wordId}`,
    });
  }

  // update solved words
  await prisma.user.update({
    where: { id: userId },
    data: {
      solved: {
        connect: [{ id: word.id }],
      },
    },
  });

  return res.json({
    success: true,
  });
};
