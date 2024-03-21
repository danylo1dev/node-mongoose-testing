const assert = require("assert");
const User = require("../src/user");

describe("Reading record from users collecton", () => {
  let joe;
  beforeEach((done) => {
    joe = new User({ name: "Joe" });

    joe.save().then(() => {
      done();
    });
  });
  it("should find array of users with name Joe", (done) => {
    User.find({ name: "Joe" })
      .then((users) => {
        assert(
          users.every((elem) => {
            return elem.name === "Joe";
          })
        );
        done();
      })
      .catch(() => {
        done();
      });
  });
  it("should find user by id", (done) => {
    User.findOne({ _id: joe._id })
      .then((user) => {
        assert(user._id.toString() === joe._id);
        done();
      })
      .catch(() => {
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
