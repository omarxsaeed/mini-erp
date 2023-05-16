import { Request, Response } from "express";
import respondWith from "../../utils/response.js";
import * as employeeService from "./employee.service.js";
import * as employeeSHService from "../employeeSalaryHistory/employeeSH.service.js";

const create = async (req: Request, res: Response) => {
  const { body } = req;

  const employee = await employeeService.create(body);

  respondWith(200, employee, "Employee created successfully", true, res);
};

const getCompletedTasks = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { month, year } = req.body;

  const result = await employeeService.getCompletedTasks(parseInt(id), month, year);

  respondWith(200, result, "Employee fetched successfully", true, res);
};

const paySalary = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { month, year } = req.body;

  // Return only unpaid tasks
  const unpaidTasks = await employeeService.getCompletedTasks(parseInt(id), month, year, false);

  const monthlySalary = await employeeService.calculateMonthlySalary(unpaidTasks);

  const result = await employeeService.paySalary(unpaidTasks);

  const salaryRecord = await employeeSHService.createSalaryRecord(
    parseInt(id),
    monthlySalary,
    parseInt(month),
    parseInt(year)
  );

  respondWith(200, salaryRecord, "Salary paid successfully", true, res);
};

export { create, getCompletedTasks, paySalary };
