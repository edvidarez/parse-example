import City from "./classes/City";
import Functions from "./functions";

City.register();
Parse.Cloud.define("exampleCreate", async (req) => {
  return Functions.Example.Create(req);
});
Parse.Cloud.define("exampleTest", async (req) => {
  return Functions.Example.Query(req);
});
