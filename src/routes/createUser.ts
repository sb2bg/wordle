import { Request, Response } from "express";
import { verifyPassword, verifyUsername, verifyEmail } from "../verify";
import { UserResponse } from "../types/userResponse";
import { generateToken } from "../jwt";
import { prisma } from "../main";
import argon2 from "argon2";

export const createUser = async (req: Request, res: Response<UserResponse>) => {
  let { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Fields username, email, and password are required",
    });
  }

  username = username.trim().toLowerCase();
  email = email.trim();

  const usernameVerification = await verifyUsername(username, prisma);

  if (!usernameVerification.valid) {
    return res.status(400).json({
      success: false,
      message: usernameVerification.message,
    });
  }

  const emailVerification = await verifyEmail(email, prisma);

  if (!emailVerification.valid) {
    return res.status(400).json({
      success: false,
      message: emailVerification.message,
    });
  }

  const passwordVerification = verifyPassword(password);

  if (!passwordVerification.valid) {
    return res.status(400).json({
      success: false,
      message: passwordVerification.message,
    });
  }

  const user = await prisma.user.create({
    data: { username, email, password: await argon2.hash(password) },
  });

  return res.json({
    success: true,
    token: generateToken(user.id),
  });
};
