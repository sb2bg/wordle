import { PrismaClient } from ".prisma/client";
import { Request, Response } from "express";
import argon2 from "argon2";
import { verifyPassword, verifyUsername, verifyEmail } from "./verify";

export const createUser = async (
  req: Request,
  res: Response,
  prisma: PrismaClient
) => {
  let { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      error: "username, email, and password are required",
    });
  }

  username = username.trim().toLowerCase();
  email = email.trim();

  const usernameVerification = await verifyUsername(username, prisma);

  if (!usernameVerification.valid) {
    return res.status(400).json({
      error: usernameVerification.message,
    });
  }

  const emailVerification = await verifyEmail(email, prisma);

  if (!emailVerification.valid) {
    return res.status(400).json({
      error: emailVerification.message,
    });
  }

  const passwordVerification = verifyPassword(password);

  if (!passwordVerification.valid) {
    return res.status(400).json({
      error: passwordVerification.message,
    });
  }

  const user = await prisma.user.create({
    data: { username, email, password: await argon2.hash(password) },
  });

  return res.json(user);
};
