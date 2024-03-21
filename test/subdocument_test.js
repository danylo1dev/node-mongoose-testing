const assert = require("assert");
const User = require("../src/user");

describe("SubDocuments", () => {
  it("can create a subdocument", (done) => {
    const joe = new User({ name: "Joe", posts: [{ title: "Post" }] });

    joe
      .save()
      .then(() => User.findOne({ name: "Joe" }))
      .then((user) => {
        assert(user);
        assert(user.posts.length > 0);
        assert(user.posts[0].title === "Post");
        done();
      })
      .catch((err) => {
        assert(!err);
        done();
      });
  });

  it("can add subdocument to existing record", (done) => {
    const joe = new User({ name: "Joe", posts: [] });
    joe
      .save()
      .then(() => User.findOne({ name: "Joe" }))
      .then((user) => {
        user.posts.push({ title: "Post" });
        return user.save();
      })
      .then(() => User.findOne({ name: "Joe" }))
      .then((user) => {
        assert(user);
        assert(user.posts.length > 0);
        assert(user.posts[0].title === "Post");
        done();
      })
      .catch((err) => {
        assert(!err);
        done();
      });
  });
  //   it("can remove subdocument from existing record", (done) => {
  //     const joe = new User({ name: "Joe", posts: [{ title: "Post" }] });
  //     joe
  //       .save()
  //       .then(() => User.findOne({ name: "Joe" }))
  //       .then((user) => {
  //         const post = user.posts[0];
  //         post.remove();
  //         return user.save();
  //       })
  //       .then(() => User.findOne({ name: "Joe" }))
  //       .then((user) => {
  //         assert(!(user.posts.length > 0));
  //         done();
  //       })
  //       .catch((err) => {
  //         assert(!err);
  //         done();
  //       });
  //   });
});
