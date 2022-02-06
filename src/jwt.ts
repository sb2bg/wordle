import jwt, { JwtPayload } from "jsonwebtoken";

const secret = process.env.TOKEN_SECRET;

if (!secret) {
  throw new Error("TOKEN_SECRET is not defined");
}

export const generateToken = (userId: number): string => {
  return jwt.sign({ userId }, secret, {
    expiresIn: 604800, // 1 week
  });
};

export const verifyToken = (token: string): string | JwtPayload => {
  return jwt.verify(token, secret);
};
