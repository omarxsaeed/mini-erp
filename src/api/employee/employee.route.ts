import { Router } from "express";

import * as employeeController from "./employee.controller.js";
import * as employeeValidation from "./employee.validation.js";
import { isAuth, granted, validateSchema } from "../../middlewares/index.js";

const router = Router();

/**
 * @openapi
 * /api/employee:
 *   post:
 *     summary: Create a new employee
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Employees
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Employee'
 *     responses:
 *       '200':
 *         description: Employee created successfully
 */

router.post(
  "/",
  isAuth,
  granted(["SUPER_ADMIN", "HR"]),
  validateSchema(employeeValidation.employeeSchema, "body"),
  employeeController.create
);

/**
 * @openapi
 * /api/employee/{id}:
 *   get:
 *     summary: Get completed tasks of an employee
 *     security:
 *       - bearerAuth: [eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbXBsb3llZUlkIjoxLCJlbXBsb3llZUVtYWlsIjoib21hckBhYm5vdXIuY29tIiwicm9sZSI6IlNVUEVSX0FETUlOIiwiaWF0IjoxNjg0Mjg4MDcyLCJleHAiOjE2ODQzNzQ0NzJ9._ph5Yy-o1QOMkiv2DIpEKTH2b4z94tpGS-3tdTJLpgk]
 *     tags:
 *       - Employees
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the employee
 *     responses:
 *       '200':
 *         description: Completed tasks retrieved successfully
 */
router.get("/:id", isAuth, granted(["SUPER_ADMIN", "HR"]), employeeController.getCompletedTasks);

/**
 * @openapi
 * /api/employee/{id}/salary:
 *   post:
 *     summary: Pay salary to an employee
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Employees
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the employee
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SalaryQuery'
 *     responses:
 *       '200':
 *         description: Salary paid successfully
 */
router.post(
  "/:id/salary",
  isAuth,
  granted(["SUPER_ADMIN", "HR"]),
  validateSchema(employeeValidation.salaryQuerySchema, "body"),
  employeeController.paySalary
);

export default router;
