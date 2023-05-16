import Ajv from "ajv";
import addFormats from "ajv-formats";
import { Request, Response, NextFunction } from "express";
import { CustomError } from "../utils/errors.js";

const ajv = new Ajv.default({ allErrors: true });
addFormats.default(ajv);

interface CustomRequest extends Request {
  [key: string]: any;
}

const validateSchema = (schema: object, property: string) => {
  return (req: CustomRequest, res: Response, next: NextFunction) => {
    if (!req[property]) {
      req[property] = {};
    }

    const validate = ajv.compile(schema);
    const valid = validate(req[property]);
    if (!valid) {
      const errors = validate.errors?.map((error) => error.message) || [];
      const err = new CustomError(errors.join(", "), 400);
      next(err);
    }
    next();
  };
};

export { validateSchema };
