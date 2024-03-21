const assert = require("assert");
const User = require("../src/user");

describe("Updating record from users collecton", () => {
  let joe;
  beforeEach((done) => {
    joe = new User({ name: "Joe", postCount: 0 });

    joe.save().then(() => {
      done();
    });
  });
  it("should update user ", (done) => {
    joe
      .set("name", "Alex")
      .save()
      .then((user) => User.find())
      .then((users) => {
        assert(users.length !== 0);
        assert(users[0].name === "Alex");
        done();
      })
      .catch((err) => {
        assert(!err);
        done();
      });
  });
});
