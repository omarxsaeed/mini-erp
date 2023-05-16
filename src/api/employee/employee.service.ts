import { CustomError } from "../../utils/errors.js";
import { Employee, PrismaClient, Task } from "@prisma/client";
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

const getCompletedTasks = async (
  employeeId: number,
  month: number,
  year: number,
  isPaid?: boolean // Optional parameter to filter by isPaid value
) => {
  try {
    const whereCondition: any = {
      employeeId,
      taskStatus: "COMPLETED",
      finishedAt: {
        gte: new Date(year, month - 1, 1),
        lt: new Date(year, month, 1),
      },
    };

    if (isPaid !== undefined) {
      whereCondition.isPaid = isPaid;
    }

    const completedTasks = await prisma.task.findMany({
      where: whereCondition,
    });

    if (!completedTasks) {
      throw new CustomError("No completed tasks", 404);
    }

    return completedTasks;
  } catch (error) {
    // Handle error
    console.error("Error finding employee:", error);
    throw new CustomError("Internal Server Error", 500);
  } finally {
    await prisma.$disconnect();
  }
};

const calculateMonthlySalary = async (tasks: Task[]) => {
  const monthlySalary = tasks.reduce((acc, task) => {
    return acc + task.taskSalary;
  }, 0);

  return monthlySalary;
};

const paySalary = async (tasks: Task[]) => {
  const updatedTasks = tasks.map((task) => {
    return prisma.task.update({
      where: {
        id: task.id,
      },
      data: {
        isPaid: true,
      },
    });
  });

  await prisma.$transaction(updatedTasks);
};

export { create, getCompletedTasks, calculateMonthlySalary, paySalary };
