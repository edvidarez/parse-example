export default class PFObject extends Parse.Object {
  public static register() {
    Parse.Object.registerSubclass(this.prototype.className, this);
    Parse.Cloud.beforeSave(this.prototype.className, async (req) => {
      this.beforeSave(req);
    });
    Parse.Cloud.afterSave(this.prototype.className, async (req) => {
      this.afterSave(req);
    });
  }
  protected static beforeSave(_: Parse.Cloud.BeforeSaveRequest) {
    console.log("empty BS");
  }
  protected static afterSave(_: Parse.Cloud.AfterSaveRequest) {
    console.log("empty AS for class:", this.prototype.className);
  }
}
