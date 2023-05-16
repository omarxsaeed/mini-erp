import { Router } from "express";

import * as employeeController from "./employee.controller.js";
import * as employeeValidation from "./employee.validation.js";
import { isAuth, granted, validateSchema } from "../../middlewares/index.js";

const router = Router();

router.post(
  "/",
  isAuth,
  granted(["SUPER_ADMIN", "HR"]),
  validateSchema(employeeValidation.employeeSchema, "body"),
  employeeController.create
);

router.get("/:id", isAuth, granted(["SUPER_ADMIN", "HR"]), employeeController.getCompletedTasks);

router.post(
  "/:id/salary",
  isAuth,
  granted(["SUPER_ADMIN", "HR"]),
  validateSchema(employeeValidation.salaryQuerySchema, "body"),
  employeeController.paySalary
);

export default router;
