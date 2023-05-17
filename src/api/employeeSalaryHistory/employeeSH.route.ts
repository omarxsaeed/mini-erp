import { Router } from "express";

import * as employeeSHController from "./employeeSH.controller.js";
import { isAuth, granted } from "../../middlewares/index.js";

const router = Router();

/**
 * @openapi
 * /api/history/{id}:
 *   get:
 *     summary: Get employee salary history
 *     description: Retrieve the salary history for a specific employee.
 *     tags:
 *       - Employee History
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Employee ID
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EmployeeSalaryHistory'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */
router.get("/:id", isAuth, granted(["SUPER_ADMIN", "HR"]), employeeSHController.getEmployeeSH);

export default router;
