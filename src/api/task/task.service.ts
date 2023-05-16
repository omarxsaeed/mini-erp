import { PrismaClient, Task, TaskStatus } from "@prisma/client";
import { CustomError } from "../../utils/errors.js";

const prisma = new PrismaClient();

const getTasks = async (employeeId: number) => {
  // Fetch tasks assigned to the employee from the database
  const tasks = await prisma.task.findMany({
    where: {
      employeeId,
    },
  });

  return tasks;
};

const createTask = async (taskInfo: Task) => {
  const result = await prisma.task.create({
    data: {
      ...taskInfo,
      deadlineDate: new Date(taskInfo.deadlineDate),
    },
  });
  return result;
};

const updateTask = async (employeeId: number, taskId: number, status: TaskStatus, finishedAt: string) => {
  // Check if the employee is assigned to the task
  const task = await prisma.task.findFirst({
    where: {
      id: taskId,
      employeeId,
    },
  });

  if (!task) {
    throw new CustomError("Task not found", 404);
  }

  // Update the task status
  const result = await prisma.task.update({
    where: {
      id: taskId,
    },
    data: {
      taskStatus: status,
      finishedAt: status === "COMPLETED" ? new Date(finishedAt) : null,
    },
  });

  if (status === "COMPLETED") {
    await prisma.employeeSalaryHistory.create({
      data: {
        employeeId: employeeId,
        salaryTaken: task.taskSalary,
        month: new Date(finishedAt).getMonth() + 1,
        year: new Date(finishedAt).getFullYear(),
      },
    });
  }

  return result;
};

export { getTasks, createTask, updateTask };
