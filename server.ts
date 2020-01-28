import { config as envConfig } from "dotenv";
import * as express from "express";
import * as ParseDashboard from "parse-dashboard";
import { ParseServer } from "parse-server";

if (envConfig().error) {
  console.log("Env variables not setted");
}

import config from "./parse_config";
const { parseConfig, extraConfig } = config;
Object.assign(parseConfig, { cloud: "./cloud/main.ts" });

const API = new ParseServer(parseConfig);
// import { main } from "./cloud/main";
const app = express();

app.get("/", (_, res) => res.send("Working fine :)\n"));
app.use("/parse", API);
app.listen(parseConfig.port, () => {
  console.log(`App listening on port ${parseConfig.port}`);
  // main();
});

if (config.extraConfig.dashboardActivated) {
  const app2 = express();
  const dashboardConfig = {
    apps: [parseConfig],
    users: extraConfig.users,
  };
  const dashboard = new ParseDashboard(dashboardConfig, {
    allowInsecureHTTP: true,
  });
  app2.use("/", dashboard).listen(8080, () => {
    console.log("dashboard is running on port 8080");
  });
}
