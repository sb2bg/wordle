import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { generateToken, verifyToken } from "../jwt";
import argon2 from "argon2";

type LoginUserResponse = {
  success: boolean;
  message?: string;
  token?: string;
};

export const loginUser = async (
  req: Request,
  res: Response<LoginUserResponse>,
  prisma: PrismaClient
) => {
  let { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: "Fields username and password are required",
    });
  }

  username = username.trim().toLowerCase();

  const user = await prisma.user.findUnique({
    where: { username },
  });

  if (!user) {
    return res.status(400).json({
      success: false,
      message: "Username or password is incorrect",
    });
  }

  const valid = await argon2.verify(user.password, password);

  if (!valid) {
    return res.status(400).json({
      success: false,
      message: "Username or password is incorrect",
    });
  }

  return res.json({
    success: true,
    token: generateToken(user.id),
  });
};
