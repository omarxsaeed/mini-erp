import { Request, Response, NextFunction } from "express";
import { CustomError } from "../utils/errors.js";
import { AuthenticatedRequest } from "./isAuth.js";

const granted = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const requesterRole = (req as AuthenticatedRequest).requester.role;
      const isAllowed = allowedRoles.includes(requesterRole);
      if (!isAllowed) {
        throw new CustomError("Not authorized", 403);
      }
      next();
    } catch (err) {
      next(err);
    }
  };
};

export { granted };
