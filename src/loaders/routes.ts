import { Router } from "express";
import authRouter from "../api/auth/auth.route.js";
import employeeRouter from "../api/employee/employee.route.js";
import taskRouter from "../api/task/task.route.js";

const router = Router();

router.get("/health", (req, res) => {
  const message = "Server's healthy and running ⚡!";
  res.json(message);
});

router.use("/auth", authRouter);
router.use("/employee", employeeRouter);
router.use("/tasks", taskRouter);

export default router;
