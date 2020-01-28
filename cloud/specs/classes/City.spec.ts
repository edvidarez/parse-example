// tslint:disable: no-unused-expression

import { expect } from "chai";
import "mocha";
import {
  dropDB,
  startParseServer,
  stopParseServer,
} from "../utils/MockedParse";

import City from "../../classes/City";

describe("Example CF", () => {
  let user: Parse.User;
  let sessionToken: string = "";
  before(async () => {
    await startParseServer();
    user = new Parse.User();
    user.setUsername("edvidarez");
    user.setPassword("Password01.");
    await user.signUp();
    sessionToken = user.getSessionToken();
  });

  after(async () => {
    await dropDB();
    await stopParseServer();
  });

  // e2e CF testing
  it("can create a City", async () => {
    const req = {
      name: "gdl",
    };
    const city: City = (await Parse.Cloud.run("exampleCreate", req, {
      sessionToken,
    })) as City;
    expect(city).to.not.be.undefined;
    expect(city.get("name")).equals("gdl");
  });
});
