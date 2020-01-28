// tslint:disable: no-unused-expression

import { expect } from "chai";
import "mocha";
import {
  dropDB,
  startParseServer,
  stopParseServer,
} from "../utils/MockedParse";

import Example from "../../functions/Example";
import City from "../../classes/City";

describe("Example CF", () => {
  let user: Parse.User;
  before(async () => {
    await startParseServer();
    user = new Parse.User();
    user.setUsername("edvidarez");
    user.setPassword("Password01.");
    await user.signUp();
  });

  after(async () => {
    await dropDB();
    await stopParseServer();
  });

  // simplier unit test
  it("call example json foo:bar", async () => {
    const req: Parse.Cloud.FunctionRequest = {
      params: {},
    };
    const response = Example.Example(req);
    expect(response.foo).equal("bar");
  });

  // e2e CF testing
  it("can execute Queries", async () => {
    const params = {
      name: "GDL",
    };
    const city = (await Parse.Cloud.run("exampleCreate", params)) as City;
    expect(city).to.not.be.undefined;
    expect(city.get("name")).equals("GDL");
    const response = await Parse.Cloud.run("exampleTest", params, {
      sessionToken: user.getSessionToken(),
    });
    expect(response).be.not.undefined;
    expect(response.id).equals(city.id);
  });
});
