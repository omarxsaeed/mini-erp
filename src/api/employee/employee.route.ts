import { Router } from "express";

import * as employeeController from "./employee.controller.js";
import { isAuth } from "../../middlewares/isAuth.js";

const router = Router();

router.post("/", isAuth, employeeController.create);

export default router;
