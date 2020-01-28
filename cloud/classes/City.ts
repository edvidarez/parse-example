import PFObject from "../core/PFObject";
export default class City extends PFObject {
  protected static beforeSave(req: Parse.Cloud.BeforeSaveRequest) {}
  protected static afterSave() {}
  constructor(params: { [key: string]: any } = {}) {
    super(City.prototype.className, params);
  }
}

Object.assign(City.prototype, {
  className: "Cities",
  isConfigured: false,
  required: ["name"],
});
