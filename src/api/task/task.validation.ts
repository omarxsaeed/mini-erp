const taskSchema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  title: "Task",
  type: "object",
  properties: {
    name: {
      type: "string",
      description: "The name of the task.",
    },
    deadlineDate: {
      type: "string",
      format: "date-time",
      description: "The deadline date of the task.",
    },
    employeeId: {
      type: "integer",
      description: "The ID of the employee assigned to the task.",
    },
    finishedAt: {
      type: ["string", "null"],
      format: "date-time",
      nullable: true,
      description: "The date and time when the task was finished.",
    },
    taskStatus: {
      type: "string",
      enum: ["PENDING", "IN_PROGRESS", "COMPLETED"],
      description: "The status of the task.",
    },
    taskSalary: {
      type: "number",
      description: "The salary associated with the task.",
    },
    isPaid: {
      type: "boolean",
      default: false,
      description: "Indicates whether the task has been paid.",
    },
  },
  required: ["name", "deadlineDate", "employeeId", "taskStatus", "taskSalary"],
  additionalProperties: false,
};

export { taskSchema };
