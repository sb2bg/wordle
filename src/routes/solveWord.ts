import { Request, Response } from "express";
import { GenericResponse } from "../types/genericResponse";
import { prisma } from "../main";

export const solveWord = async (
  req: Request,
  res: Response<GenericResponse>
) => {
  const { wordId } = req.body;

  if (!wordId) {
    return res.status(400).json({
      success: false,
      message: "Field wordId is required",
    });
  }

  const user = await prisma.user.findUnique({
    where: { id: req.userId },
  });

  if (!user) {
    return res.status(400).json({
      success: false,
      message: `Couldn't find user with id ${req.userId}`,
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
    where: { id: req.userId },
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
