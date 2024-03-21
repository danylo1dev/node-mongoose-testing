const { default: mongoose } = require("mongoose");
before((done) => {
  mongoose.connect("mongodb://127.0.0.1:27017/users_test");

  mongoose.connection
    .once("open", () => {
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
