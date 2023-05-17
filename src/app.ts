import express from "express";
import routes from "./loaders/routes.js";
import routesSettings from "./loaders/routesSettings.js";
import mainErrorHandler from "./loaders/mainErrorHandler.js";
import { setupSwagger } from "./docs/swagger.js";

const app = express();

routesSettings(app);

app.use("/api", routes);

setupSwagger(app, routes);

mainErrorHandler(app);

export default app;
