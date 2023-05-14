import { Router } from "express";

const router = Router();

router.get("/health", (req, res) => {
  const message = "Server's healthy and running ⚡!";
  res.json(message);
});

export default router;
