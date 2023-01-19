import { verify } from "jsonwebtoken";
import { AUTH_STATUS, Token, Context } from "./types";
import { prisma } from "./prisma";
import {Request, Response} from "express";

const APP_SECRET = process.env.JWT_SECRET;

export function createContext(req: Request, res:Response): Context {
  let userId: number = 0;
  let authStatus: AUTH_STATUS = AUTH_STATUS.UNKNOWN;

  try {
    const Authorization = req.headers.authorization;
    const token = Authorization?.replace("Bearer ", "");
    userId = verify(token as string, APP_SECRET as string) as any;
    const verifiedToken: Token = { userId };

    if (verifiedToken.userId) {
      authStatus = AUTH_STATUS.AUTHENTICATED;
      userId = verifiedToken.userId;
    }
  } catch (err: any) {
    const { name } = err;
    switch (name) {
      // 토큰 만료
      case "TokenExpiredError":
        authStatus = AUTH_STATUS.TOKEN_EXPIRED;
        break;
      // 잘못된 토큰
      case "JsonWebTokenError":
        authStatus = AUTH_STATUS.TOKEN_INVALID;
        break;
      default:
        authStatus = AUTH_STATUS.TOKEN_NOT_FOUND;
        break;
    }
  }

  return {
    req,
    res,
    userId,
    authStatus,
    prisma,
  };
}
