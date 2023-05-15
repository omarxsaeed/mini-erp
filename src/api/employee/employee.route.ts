import { Router } from "express";

import * as employeeController from "./employee.controller.js";

const router = Router();

router.post("/", employeeController.create);

export default router;
