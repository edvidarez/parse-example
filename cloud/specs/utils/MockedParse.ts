// tslint:disable: no-empty
import * as express from "express";
import * as http from "http";
import { MongoClient } from "mongodb";
import { ParseServer } from "parse-server";

let parseServerState: any = {};
const connectDB = (databaseURI: string) =>
  MongoClient.connect(databaseURI, { useUnifiedTopology: true });
const dropDB = () => {
  const mongoConnection: MongoClient = parseServerState.mongoConnection;
  return mongoConnection.db().dropDatabase();
};

async function startParseServer(parseServerOptions: any = {}) {
  const mongodbPort = process.env.MONGODB_PORT || 27017;
  const {
    databaseName = "parse-test",
    databaseURI = `mongodb://localhost:${mongodbPort}/${databaseName}`,
    masterKey = "test",
    appId = "test",
    port = 30001,
    mountPath = "/1",
    serverURL = `http://localhost:${port}${mountPath}`,
  } = parseServerOptions;

  const mongoConnection: MongoClient = await connectDB(databaseURI);
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
  const mongoConnection: MongoClient = parseServerState.mongoConnection;
  mongoConnection.close();
  const httpServer: http.Server = parseServerState.httpServer;
  httpServer.close();
  parseServerState = {};
  console.log("\tServer was closed");
}

export { dropDB, startParseServer, stopParseServer, parseServerState };
