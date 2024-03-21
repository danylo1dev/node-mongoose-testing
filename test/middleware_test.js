const assert = require("assert");
const User = require("../src/user");
const BlogPost = require("../src/blogPost");

describe("middalware", () => {
  let joe, blogPost;
  beforeEach(() => {
    joe = new User({ name: "Joe" });
    blogPost = new BlogPost({
      title: "JS is Great",
      content: "Yep it really is",
    });

    joe.blogPosts.push(blogPost);

    Promise.all([joe.save(), blogPost.save()]).then(() => {
      done();
    });
  });
  it("users clean up dangling blogpost on remove", (done) => {
    joe
      .deleteOne()
      .then(() => BlogPost.countDocuments())
      .then((count) => {
        assert(count === 0);
      })
      .finally(() => {
        done();
      });
  });
});
