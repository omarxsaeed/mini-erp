import { Request, Response } from "express";
import respondWith from "../../utils/response.js";
import * as employeeService from "./employee.service.js";

const create = async (req: Request, res: Response) => {
  const { body } = req;

  const employee = await employeeService.create(body);

  respondWith(200, employee, "Employee created successfully", true, res);
};

export { create };
