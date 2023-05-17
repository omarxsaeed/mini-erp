import { Router } from "express";

import * as authController from "./auth.controller.js";
import { validateSchema } from "../../middlewares/validateSchema.js";
import * as authValidation from "./auth.validation.js";

const router = Router();

router.post("/login", validateSchema(authValidation.loginSchema, "body"), authController.login);

export default router;
