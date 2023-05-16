import { Router } from "express";

import * as employeeSHController from "./employeeSH.controller.js";
import { isAuth, granted } from "../../middlewares/index.js";

const router = Router();

router.get("/:id", isAuth, granted(["SUPER_ADMIN", "HR"]), employeeSHController.getEmployeeSH);

export default router;
