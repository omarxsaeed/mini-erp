import { Router } from "express";

import * as taskController from "./task.controller.js";
import * as taskValidation from "./task.validation.js";
import { isAuth, validateSchema } from "../../middlewares/index.js";

const router = Router();

/**
 * @openapi
 * /api/tasks:
 *   get:
 *     summary: Get tasks
 *     description: Retrieve a list of tasks.
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TaskList'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */
router.get("/", isAuth, taskController.getTasks);

/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Create task
 *     description: Create a new task.
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Task object
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       201:
 *         description: Task created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */
router.post("/", isAuth, validateSchema(taskValidation.taskSchema, "body"), taskController.createTask);

/**
 * @swagger
 * /api/tasks/{taskId}:
 *   put:
 *     summary: Update task
 *     description: Update an existing task.
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: taskId
 *         description: Task ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */
router.put("/:taskId", isAuth, taskController.updateTask);

export default router;
