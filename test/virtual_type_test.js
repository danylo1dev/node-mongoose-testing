const assert = require("assert");
const User = require("../src/user");

describe("Validation records", () => {
  it("postCount return number of posts", (done) => {
    const joe = new User({
      name: "Joe",
      posts: [{ title: "Post" }],
    });
    joe
      .save()
      .then(() => User.findOne({ name: "Joe" }))
      .then((user) => {
        assert(user.postCount === 1);
      })
      .finally(() => {
        done();
      });
  });
});
