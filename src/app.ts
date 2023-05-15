import express from "express";
import routes from "./loaders/routes.js";
import routesSettings from "./loaders/routesSettings.js";
import mainErrorHandler from "./loaders/mainErrorHandler.js";

const app = express();

routesSettings(app);
app.use("/api", routes);

mainErrorHandler(app);

export default app;
