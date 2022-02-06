import { Request, Response } from "express";
import { generateToken } from "../jwt";
import { UserResponse } from "../types/userResponse";
import { prisma } from "../main";
import argon2 from "argon2";

export const loginUser = async (req: Request, res: Response<UserResponse>) => {
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
