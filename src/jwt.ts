import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response } from "express";
import { GenericResponse } from "./types/genericResponse";

const secret = process.env.TOKEN_SECRET;

if (!secret) {
  throw new Error("TOKEN_SECRET is not defined");
}

export const generateToken = (userId: number): string => {
  return jwt.sign({ userId }, secret, {
    expiresIn: 15, // 1 week
  });
};

export const authToken = (
  req: Request,
  res: Response<GenericResponse>,
  next: Function
) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "No token provided",
    });
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err || !decoded) {
      return res.status(401).json({
        success: false,
        message: "Token is not valid or has expired",
      });
    }

    req.userId = (decoded as JwtPayload).userId;
    next();
  });
};
