const employeeSchema = {
  type: "object",
  properties: {
    name: { type: "string" },
    email: { type: "string", format: "email" },
    password: { type: "string" },
    joinDate: { type: "string" },
    birthDate: { type: "string" },
    role: { type: "string", enum: ["SUPER_ADMIN", "HR", "DEVELOPER"] },
    profilePicture: { type: ["string", "null"] },
  },
  required: ["name", "email", "password", "joinDate", "birthDate", "role"],
  additionalProperties: false,
};

const salaryQuerySchema = {
  type: "object",
  properties: {
    month: { type: "string" },
    year: { type: "string" },
  },
  required: ["month", "year"],
  additionalProperties: false,
};

export { employeeSchema, salaryQuerySchema };
