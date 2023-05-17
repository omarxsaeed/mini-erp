const employeeSchema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  title: "Employee",
  type: "object",
  properties: {
    name: {
      type: "string",
      description: "The name of the employee",
    },
    email: {
      type: "string",
      format: "email",
      description: "The email address of the employee",
    },
    password: {
      type: "string",
      description: "The password of the employee",
    },
    joinDate: {
      type: "string",
      format: "date",
      description: "The date when the employee joined",
    },
    birthDate: {
      type: "string",
      format: "date",
      description: "The birth date of the employee",
    },
    role: {
      type: "string",
      enum: ["SUPER_ADMIN", "HR", "DEVELOPER"],
      description: "The role of the employee",
    },
    profilePicture: {
      type: ["string", "null"],
      description: "The URL of the employee's profile picture",
    },
  },
  required: ["name", "email", "password", "joinDate", "birthDate", "role"],
  additionalProperties: false,
};

const salaryQuerySchema = {
  type: "object",
  properties: {
    month: {
      type: "string",
      description: "The month for which salary is queried",
    },
    year: {
      type: "string",
      description: "The year for which salary is queried",
    },
  },
  required: ["month", "year"],
  additionalProperties: false,
};

export { employeeSchema, salaryQuerySchema };
