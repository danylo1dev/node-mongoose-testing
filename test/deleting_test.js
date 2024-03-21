const assert = require("assert");
const User = require("../src/user");

describe("Deliting record from users collecton", () => {
  let joe;
  beforeEach((done) => {
    joe = new User({ name: "Joe" });

    joe.save().then(() => {
      done();
    });
  });
  it("should remove model instance ", (done) => {
    joe
      .deleteOne()
      .then(() => User.findOne({ name: "Joe" }))
      .then((user) => {
        assert(user === null);
        done();
      });
  });
});
