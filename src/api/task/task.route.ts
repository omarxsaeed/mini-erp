import { Router } from "express";

import * as taskController from "./task.controller.js";
import * as taskValidation from "./task.validation.js";
import { isAuth, validateSchema } from "../../middlewares/index.js";

const router = Router();

router.get("/", isAuth, taskController.getTasks);

router.post("/", isAuth, validateSchema(taskValidation.taskSchema, "body"), taskController.createTask);

router.put("/:taskId", isAuth, taskController.updateTask);

export default router;
