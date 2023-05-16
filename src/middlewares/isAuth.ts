import { Request, Response, NextFunction } from "express";
import { decodeToken } from "../utils/jwt.js";
import { CustomError } from "../utils/errors.js";

interface AuthenticatedRequest extends Request {
  requester: any; // Adjust the type of requester according to your requirements
}

const isAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new CustomError("Not authenticated", 401);
    } else {
      const token = authHeader.split("Bearer ")[1] ?? authHeader;
      const decodedToken = decodeToken(token);
      (req as AuthenticatedRequest).requester = decodedToken;
      return next();
    }
  } catch (err) {
    next(err);
  }
};

export { isAuth, AuthenticatedRequest };
