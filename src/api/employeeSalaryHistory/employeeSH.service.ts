import { CustomError } from "../../utils/errors.js";
import { EmployeeSalaryHistory, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createSalaryRecord = async (employeeId: number, salary: number, month: number, year: number) => {
  try {
    const result = await prisma.employeeSalaryHistory.create({
      data: {
        employeeId,
        salaryTaken: salary,
        month,
        year,
      },
    });

    return result;
  } catch (error) {
    // Handle error
    console.error("Error creating salary record:", error);
    throw new CustomError("Internal Server Error", 500);
  } finally {
    await prisma.$disconnect();
  }
};

const getEmployeeSH = async (employeeId: number) => {
  try {
    const result = await prisma.employeeSalaryHistory.findMany({
      where: {
        employeeId,
      },
    });

    if (result.length === 0) {
      throw new CustomError("Employee salary history not found", 404);
    }

    return result;
  } catch (error) {
    // Handle error
    console.error("Error fetching employee salary history:", error);
    throw new CustomError("Internal Server Error", 500);
  } finally {
    await prisma.$disconnect();
  }
};

export { createSalaryRecord, getEmployeeSH };
