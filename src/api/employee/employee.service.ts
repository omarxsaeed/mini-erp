import { CustomError } from "../../utils/errors.js";
import { Employee, PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const create = async (employeeInfo: Employee) => {
  try {
    const employee = await prisma.employee.findUnique({
      where: {
        email: employeeInfo.email,
      },
    });

    if (employee) {
      throw new CustomError("Employee already exists", 400);
    }

    const hashedPassword = await bcrypt.hash(employeeInfo.password, 10);

    const result = await prisma.employee.create({
      data: {
        ...employeeInfo,
        password: hashedPassword,
        joinDate: new Date(employeeInfo.joinDate),
        birthDate: new Date(employeeInfo.birthDate),
      },
    });

    return result;
  } catch (error) {
    // Handle error
    console.error("Error finding employee:", error);
    throw new CustomError("Internal Server Error", 500);
  } finally {
    await prisma.$disconnect();
  }
};

export { create };
