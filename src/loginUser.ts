import { Request, Response } from "express";
import { PrismaClient } from ".prisma/client";
import argon2 from "argon2";

export const loginUser = async (
  req: Request,
  res: Response,
  prisma: PrismaClient
) => {
  let { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      error: "username and password are required",
    });
  }

  username = username.trim().toLowerCase();

  const user = await prisma.user.findUnique({
    where: { username },
  });

  if (!user) {
    return res.status(400).json({
      error: "Username or password is incorrect",
    });
  }

  const valid = await argon2.verify(user.password, password);

  if (!valid) {
    return res.status(400).json({
      error: "Username or password is incorrect",
    });
  }

  return res.json({
    user: {
      id: user.id,
    },
  });
};
