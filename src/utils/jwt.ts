import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config/index.js";
import { CustomError } from "./errors.js";

interface employeeTokenPayload extends JwtPayload {
  employeeId: number;
  employeeEmail: string;
  role: string;
}

const createToken = (payload: employeeTokenPayload): string => {
  try {
    const token = jwt.sign(payload, config.jwt.secret, { expiresIn: config.jwt.expiresIn });
    return token;
  } catch (err) {
    const errorMessage = (err as Error).message || "Invalid token";
    throw new CustomError(errorMessage, 401);
  }
};

const decodeToken = (token: string): object | string => {
  try {
    const decodedToken = jwt.verify(token, config.jwt.secret);
    return decodedToken;
  } catch (err) {
    throw new CustomError(String(err), 401);
  }
};

export { createToken, decodeToken };
