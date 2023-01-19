import { objectType } from "nexus";
import { User } from "../../generated/nexus-prisma";

const user = objectType({
  name: User.$name,
  description: User.$description,
  definition(t) {
    t.field(User.userId);
    t.field(User.email);
    t.field(User.password);

    t.field(User.age);
    t.field(User.nickName);
    t.field(User.updatedAt);
    t.field(User.createdAt);

    t.field(User.subs);
    t.field(User.posts);
    t.field(User.comments);
    t.field(User.votePosts);
    t.field(User.voteComments);
  },
});

export default user;
