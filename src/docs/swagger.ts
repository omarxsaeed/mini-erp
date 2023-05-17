import swaggerUi from "swagger-ui-express";
import swaggerJsdoc, { Options } from "swagger-jsdoc";
import { Express, Router } from "express";
import { loginSchema } from "../api/auth/auth.validation.js";
import * as EmployeeSchemas from "../api/employee/employee.validation.js";
import { taskSchema } from "../api/task/task.validation.js";

const setupSwagger = (app: Express, router: Router) => {
  const extractRoutePaths = (router: Router): string[] => {
    const routePaths: string[] = [];

    router.stack.forEach((layer) => {
      if (layer.route) {
        routePaths.push(layer.route.path);
      } else if (layer.name === "router" && layer.handle) {
        const nestedRouter = layer.handle as Router;
        const nestedRoutePaths = extractRoutePaths(nestedRouter);
        routePaths.push(...nestedRoutePaths);
      }
    });

    return routePaths;
  };

  const routePaths = extractRoutePaths(router);
  console.log(routePaths);

  const options: Options = {
    swaggerDefinition: {
      openapi: "3.0.0",
      info: {
        title: "ERP API",
        description: "API documentation for managing your ERP system",
        version: "1.0.0",
      },
      components: {
        schemas: {
          // Define JSON schema here
          Login: loginSchema,
          Employee: EmployeeSchemas.employeeSchema,
          SalaryQuery: EmployeeSchemas.salaryQuerySchema,
          Task: taskSchema,
        },
      },
    },
    apis: [
      "src/api/auth/auth.route.ts",
      "src/api/employee/employee.route.ts",
      "src/api/task/task.route.ts",
      "src/api/employeeSalaryHistory/employeeSH.route.ts",
    ],
  };
  const swaggerSpecs = swaggerJsdoc(options);

  // Serve Swagger UI
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
};

export { setupSwagger };
