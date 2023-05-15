import { PrismaClient } from "@prisma/client";
import { CustomError } from "../../utils/errors.js";
import bcrypt from "bcrypt";
import { createToken } from "../../utils/jwt.js";

const prisma = new PrismaClient();

const login = async (email: string, password: string) => {
  try {
    const employee = await prisma.employee.findUnique({
      where: {
        email: email,
      },
    });

    if (!employee) {
      throw new CustomError("No employee found", 400);
    }

    const isValidPassword = await bcrypt.compare(password, employee.password);

    if (!password || !isValidPassword) {
      throw new CustomError("Invalid password", 401);
    }

    const token = createToken({
      employeeId: employee.id,
      employeeEmail: employee.email,
      role: employee.role,
    });

    return token;
  } catch (error) {
    // Handle error
    console.error("Error finding employee:", error);
    throw new CustomError("Internal Server Error", 500);
  } finally {
    await prisma.$disconnect();
  }
};

export { login };
