import { Express, Request, Response, NextFunction } from "express";
import { CustomError, handleError } from "../utils/errors.js";

const mainErrorHandler = (app: Express) => {
  app.use((err: CustomError, req: Request, res: Response, next: NextFunction) => {
    handleError(err, res);
  });
};

export default mainErrorHandler;
