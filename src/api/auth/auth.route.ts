import { Router } from "express";

import * as authController from "./auth.controller.js";
import { validateSchema } from "../../middlewares/validateSchema.js";
import * as authValidation from "./auth.validation.js";

const router = Router();

/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     summary: User login
 *     description: Endpoint to authenticate and log in a user.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       '200':
 *         description: User logged in successfully
 *       '401':
 *         description: Invalid credentials
 */

router.post("/login", validateSchema(authValidation.loginSchema, "body"), authController.login);

export default router;
