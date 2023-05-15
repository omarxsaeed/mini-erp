import { Request, Response } from "express";
import respondWith from "../../utils/response.js";
import * as authService from "./auth.service.js";

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const token = await authService.login(email, password);

  return respondWith(200, { token }, "Logged in successfully. Welcome!", true, res);
};

export { login };
