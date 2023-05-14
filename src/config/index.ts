import dotenv from "dotenv";
dotenv.config();

interface ServerConfig {
  port: number;
  host: string;
}

interface config {
  server: ServerConfig;
}

const config: config = {
  server: {
    port: process.env.PORT ? parseInt(process.env.PORT) : 5000,
    host: process.env.HOST ?? "127.0.0.1",
  },
};

export default config;
