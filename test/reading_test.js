const assert = require("assert");
const User = require("../src/user");

describe("Reading record from users collecton", () => {
  let joe, maria, alex, zach;
  beforeEach((done) => {
    joe = new User({ name: "Joe" });
    alex = new User({ name: "Alex" });
    maria = new User({ name: "Maria" });
    zach = new User({ name: "Zach" });

    Promise.all([alex.save(), maria.save(), zach.save(), joe.save()]).then(
      () => {
        done();
      }
    );
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

  it("can skip and limit the result set", (done) => {
    User.find()
      .sort({ name: 1 })
      .then((allUsers) => {
        User.find()
          .sort({ name: 1 })
          .skip(1)
          .limit(2)
          .then((users) => {
            assert(users[0].name === allUsers[1]);
            assert(users[1].name === allUsers[2]);
            assert(users.length === 2);
          })
          .finally(() => done());
      });
  });
});
