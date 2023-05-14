import express from "express";
import routes from "./loaders/routes.js";
import routesSettings from "./loaders/routesSettings.js";
const app = express();

routesSettings(app);
app.use("/api", routes);

export default app;
