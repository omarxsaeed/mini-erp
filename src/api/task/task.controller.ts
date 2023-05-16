import { Request, Response } from "express";
import * as taskService from "./task.service.js";
import respondWith from "../../utils/response.js";
import { AuthenticatedRequest } from "../../middlewares/isAuth.js";

const getTasks = async (req: AuthenticatedRequest, res: Response) => {
  const employeeId = req.requester.employeeId;

  const tasks = await taskService.getTasks(employeeId);

  respondWith(200, tasks, "here are all your tasks", true, res);
};

const createTask = async (req: AuthenticatedRequest, res: Response) => {
  const { body } = req;

  const task = await taskService.createTask(body);

  respondWith(201, task, "task created successfully", true, res);
};

const updateTask = async (req: AuthenticatedRequest, res: Response) => {
  const employeeId = req.requester.employeeId;
  const taskId = parseInt(req.params.taskId);
  const { taskStatus, finishedAt } = req.body;

  const task = await taskService.updateTask(employeeId, taskId, taskStatus, finishedAt);

  respondWith(200, task, "task updated successfully", true, res);
};

export { getTasks, createTask, updateTask };
