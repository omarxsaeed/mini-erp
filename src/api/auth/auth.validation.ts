const loginSchema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  title: "Login",
  type: "object",
  properties: {
    email: {
      type: "string",
      format: "email",
      description: "The email address of the user.",
    },
    password: {
      type: "string",
      description: "The password of the user.",
    },
  },
  required: ["email", "password"],
  additionalProperties: false,
};

export { loginSchema };
