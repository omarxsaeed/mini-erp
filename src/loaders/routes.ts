import { Router } from "express";
import authRouter from "../api/auth/auth.route.js";

const router = Router();

router.get("/health", (req, res) => {
  const message = "Server's healthy and running ⚡!";
  res.json(message);
});

router.use("/auth", authRouter);

export default router;
