const { default: mongoose } = require("mongoose");
const User = require("../src/user");
before((done) => {
  mongoose.connect("mongodb://127.0.0.1:27017/users_test");

  mongoose.connection
    .once("open", () => {
      console.log("Good to go");
      done();
    })
    .on("error", (error) => {
      console.warn(error);
    });
});

beforeEach((done) => {
  const { users, comments, blogposts } = mongoose.connection.collections;

  users.drop(() => {
    comments.drop(() => {
      blogposts.drop(() => {
        done();
      });
    });
  });
});
