import { Response } from "express";

interface ResponseData {
  [key: string]: any;
}

const respondWith = (
  statusCode: number,
  data: ResponseData,
  message: string,
  success: boolean,
  res: Response
): Response => {
  return res.status(statusCode).json({ data, message, success });
};

export default respondWith;
