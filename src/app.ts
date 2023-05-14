import express from "express";
const app = express();

app.get("/health", (req, res) => {
  const message = "Server's healthy and running ⚡!";
  res.json(message);
});

export default app;
