// tslint:disable: no-empty
import * as express from "express";
import * as http from "http";
import * as mongo from "mongodb";
import { ParseServer } from "parse-server";

let parseServerState: any = {};

import * as mongoDBRunnerStart from "mongodb-runner/mocha/before";
mongoDBRunnerStart.bind({
  timeout() {},
  slow() {},
});
import * as mongoDBRunnerStop from "mongodb-runner/mocha/after";
const connectDB = (databaseURI: string) =>
  mongo.MongoClient.connect(databaseURI, { useUnifiedTopology: true });
const dropDB = () => {
  const mongoConnection: mongo.MongoClient = parseServerState.mongoConnection;
  return mongoConnection.db().dropDatabase();
};

async function startParseServer(parseServerOptions: any = {}) {
  // const mongodbPort = process.env.MONGODB_PORT || 27017;
  const {
    databaseName = "parse-test",
    databaseURI = `mongodb://localhost/${databaseName}`,
    masterKey = "test",
    appId = "test",
    port = 30001,
    mountPath = "/1",
    serverURL = `http://localhost:${port}${mountPath}`,
  } = parseServerOptions;

  console.log("trying mongo_connect", databaseURI, "url");
  mongo.MongoClient.connect(databaseURI, (err, client) => {
    if (err) {
      console.log("trying mongo_connect", databaseURI, "url");
      console.group("Error", err);
    } else {
      console.log("Connected successfully to server");
      const db = client.db(databaseName);

      client.close();
    }
  });
  await mongoDBRunnerStart();
  const mongoConnection: mongo.MongoClient = await connectDB(databaseURI);

  console.log("trying mongo_connect success", mongoConnection);
  parseServerOptions = Object.assign(
    {
      appId,
      cloud: "./cloud/main",
      databaseURI,
      masterKey,
      serverURL,
      silent: process.env.VERBOSE !== "1",
    },
    parseServerOptions,
  );
  const app = express();
  const parseServer = new ParseServer(parseServerOptions);
  app.use(mountPath, parseServer);

  const httpServer = http.createServer(app);

  httpServer.listen(port, () => {
    console.log("\tServer is running");
  });
  return Object.assign(parseServerState, {
    expressApp: app,
    httpServer,
    mongoConnection,
    parseServer,
    parseServerOptions,
  });
}

async function stopParseServer() {
  const mongoConnection: mongo.MongoClient = parseServerState.mongoConnection;
  mongoConnection.close();
  const httpServer: http.Server = parseServerState.httpServer;
  httpServer.close();
  mongoDBRunnerStop();
  parseServerState = {};
  console.log("\tServer was closed");
}

export { dropDB, startParseServer, stopParseServer, parseServerState };
