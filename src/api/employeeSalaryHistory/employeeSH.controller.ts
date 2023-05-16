import { Request, Response } from "express";
import respondWith from "../../utils/response.js";
import * as employeeSHService from "../employeeSalaryHistory/employeeSH.service.js";

const getEmployeeSH = async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await employeeSHService.getEmployeeSH(parseInt(id));

  respondWith(200, result, "Employee salary history fetched successfully", true, res);
};

export { getEmployeeSH };
