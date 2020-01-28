import City from "../classes/City";

const Example = (req: Parse.Cloud.FunctionRequest) => {
  return {
    foo: "bar",
  };
};
const Create = async (req?: Parse.Cloud.FunctionRequest) => {
  const city = new City();
  city.set("name", req.params.name);
  await city.save();
  return city;
};
const Query = async (req: Parse.Cloud.FunctionRequest) => {
  const res = (await new Parse.Query("Cities").first({
    useMasterKey: true,
  })) as City;
  return res;
};
export default { Example, Create, Query };
