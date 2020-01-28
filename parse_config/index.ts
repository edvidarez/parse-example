import customPages from "./custom_pages";
import emailAdapter from "./email_adapter";
import filesAdapter from "./file_adapter";

const preventLoginWithUnverifiedEmail = emailAdapter ? true : undefined;
const verifyUserEmails = emailAdapter ? false : undefined;

const config = {
  parseConfig: {
    appId: process.env.APP_ID || "SampleAppId",
    appName: process.env.APP_NAME || "Parse Example",
    masterKey: process.env.MASTER_KEY || "SampleMasterKey",
    port: 1337,

    publicServerURL:
      process.env.PUBLIC_SERVER_URL || "http://localhost:1337/parse",
    serverURL: process.env.SERVER_URL || "http://localhost:1337/parse",

    databaseURI:
      process.env.DB_URL || "mongodb://localhost:27017/parse-example",

    customPages,
    emailAdapter,

    filesAdapter,
    maxUploadSize: "100mb",

    preventLoginWithUnverifiedEmail,
    verifyUserEmails,
  },

  extraConfig: {
    dashboardActivated: true,
    users: [
      {
        pass: "pass",
        user: "admin",
      },
    ],
  },
};

export default config;
