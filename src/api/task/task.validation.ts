const taskSchema = {
  type: "object",
  properties: {
    name: { type: "string" },
    deadlineDate: { type: "string" },
    employeeId: { type: "integer" },
    finishedAt: { type: ["string", "null"] },
    taskStatus: { type: "string", enum: ["PENDING", "IN_PROGRESS", "COMPLETED"] },
    taskSalary: { type: "number" },
    isPaid: { type: "boolean", default: false },
  },
  required: ["name", "deadlineDate", "employeeId", "taskStatus", "taskSalary"],
  additionalProperties: false,
};

export { taskSchema };
