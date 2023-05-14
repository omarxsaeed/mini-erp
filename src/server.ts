import http from "http";

import app from "./app.js";
import config from "./config/index.js";

const PORT = config.server.port;
const HOST = config.server.host;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server is live on http://${HOST}:${PORT}`);
});

export default server;
