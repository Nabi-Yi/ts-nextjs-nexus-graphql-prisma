import { objectType } from "nexus";
import { Sub } from "../../generated/nexus-prisma";

const sub = objectType({
  name: Sub.$name,
  definition(t) {
    t.field(Sub.subId);
    t.field(Sub.title);
    t.field(Sub.description);

    t.field(Sub.createdAt);
    t.field(Sub.updatedAt);
    t.field(Sub.imageUrl);
    t.field(Sub.bannerUrl);

    t.field(Sub.ownerId);
    t.field(Sub.owner);
    t.field(Sub.posts);
  },
});

export default sub;