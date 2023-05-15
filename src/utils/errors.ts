import { Response } from "express";
import respondWith from "./response.js";

class CustomError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

const handleError = (err: CustomError, res: Response) => {
  const { message, statusCode = 500 } = err;
  respondWith(statusCode, {}, message, false, res);
};

export { CustomError, handleError };
