import { objectType } from "nexus";
import { Post } from "../../generated/nexus-prisma";

const post = objectType({
  name: Post.$name,
  definition(t) {
    t.field(Post.postId);
    t.field(Post.body);
    t.field(Post.title);
    t.field(Post.createdAt);
    t.field(Post.updatedAt);
    t.field(Post.slug);
    t.field(Post.identifier);

    t.field(Post.authorId);
    t.field(Post.author);

    t.field(Post.sub);
    t.field(Post.subId);

    t.field(Post.comments);
    t.field(Post.votePosts);
  },
});

export default post