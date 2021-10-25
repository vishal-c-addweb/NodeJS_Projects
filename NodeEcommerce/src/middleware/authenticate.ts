import config from "config";
import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import Payload from "../types/Payload";
import Request from "../types/Request";
import { dataArray, responseFunction } from "../response_builder/responsefunction";
import responsecode from "../response_builder/responsecode";

export default function (req: Request, res: Response, next: NextFunction) {
  // Get token from header
  const header: string = req.headers.authorization;
  // Check if no token
  if (!header) {
    let meta: object = { message: "token is not added", status: "Failed" };
    responseFunction(meta, dataArray, responsecode.Not_Found, res);
  }
  // Verify token
  try {
    let token: string = header.split(' ')[1];
    const payload: Payload | any = jwt.verify(token, config.get("jwtSecret"));
    req.userId = payload.user_id;
    req.isAdmin = payload.user_isAdmin;
    next();
  } catch (err) {
    let meta: object = { message: "token is not valid", status: "Failed" };
    responseFunction(meta, dataArray, responsecode.Unauthorized, res);
  }
}