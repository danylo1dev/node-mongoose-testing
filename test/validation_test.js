const assert = require("assert");
const User = require("../src/user");

describe("Validation records", () => {
  it("require a user name", () => {
    const user = new User({ name: undefined });
    const valRes = user.validateSync();
    const { message } = valRes.errors.name;
    assert(message.trim() === "Name is required.".trim());
  });
  it("requires a user name longer than 2 characters", () => {
    const user = new User({ name: "am" });
    const valRes = user.validateSync();
    const { message } = valRes.errors.name;
    assert(message.trim() === "Name must be longer than 2 characters".trim());
  });
});
