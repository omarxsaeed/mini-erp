import dotenv from "dotenv";
dotenv.config();

interface ServerConfig {
  port: number;
  host: string;
}

interface JWTConfig {
  secret: string;
  expiresIn: string;
}

interface config {
  server: ServerConfig;
  jwt: JWTConfig;
}

const config: config = {
  server: {
    port: process.env.PORT ? parseInt(process.env.PORT) : 5000,
    host: process.env.HOST ?? "127.0.0.1",
  },
  jwt: {
    secret: process.env.JWT_SECRET_KEY ?? "secret",
    expiresIn: process.env.JWT_EXPIRY_DATE ?? "1h",
  },
};

export default config;
