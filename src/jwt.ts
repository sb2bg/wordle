import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response } from "express";
import { GenericResponse } from "./types/genericResponse";

const secret = process.env.TOKEN_SECRET;

if (!secret) {
  throw new Error("TOKEN_SECRET is not defined");
}

export const generateToken = (userId: number): string => {
  return jwt.sign({ userId }, secret, {
    expiresIn: 604800, // 1 week
  });
};

export const authToken = (
  req: Request,
  res: Response<GenericResponse>,
  next: Function
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: "No token provided",
    });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, secret, (err, decoded) => {
    if (err || !decoded) {
      res.status(401).json({
        success: false,
        message: "Token is not valid or has expired",
      });
    }

    req.userId = (decoded as JwtPayload).userId;
    next();
  });
};
