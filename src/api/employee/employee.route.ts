import { Router } from "express";

import * as employeeController from "./employee.controller.js";
import { isAuth, granted } from "../../middlewares/index.js";

const router = Router();

router.post("/", isAuth, granted(["SUPER_ADMIN", "HR"]), employeeController.create);

export default router;
